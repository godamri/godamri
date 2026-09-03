---
title: "Building Powerclip: Lessons in Automated Video Encoding"
slug: "building-powerclip-video-encoding"
date: "2024-07-14"
category: "infra"
categoryLabel: "Backend & Infra"
readingTime: "9 min read"
excerpt: "FFmpeg edge cases, Redis task worker dispatching, and hardware memory saturation handling across unpredictable real-time batch workloads."
featured: false
tags: ["FFmpeg", "Video Processing", "Redis", "Queues"]
---

Building an automated short-form video generation platform sounds straightforward in theory: take a video input, crop it to 9:16 aspect ratio, burn subtitles, apply audio normalization, and encode the MP4.

In production, FFmpeg will test every assumption you have about Linux process management, thread contention, and memory fragmentation.

---

## 1. Process Concurrency vs. Thread Saturation

By default, FFmpeg will greedily attempt to consume every CPU core available on the host machine. If you run 4 concurrent workers on a 16-core server, each invoking FFmpeg without explicit thread limits, thread scheduling contention will degrade throughput by over 40%.

We achieved optimal throughput by binding thread pools and pinning CPU affinity:

```bash
ffmpeg -threads 4 -filter_threads 2 -i input.mp4 ...
```

---

## 2. Preventing Out-Of-Memory (OOM) Kills

Complex filtergraphs (especially subtitle burn-in with `libass` and dynamic motion zoom) buffer raw frame bitmaps in memory. A sudden spike in 4K 60fps uploads quickly exhausts server RAM, triggering the Linux kernel OOM killer.

We implemented a two-tier admission control mechanism in Redis:

- **Weighted Semaphore**: Tasks are assigned "credits" based on source resolution and duration.
- Workers only dequeue new jobs if aggregate host memory usage remains below 75%. If memory exceeds the safety threshold, workers throttle consumption dynamically.

This eliminated 100% of sudden node crashes during peak ingestion windows.
