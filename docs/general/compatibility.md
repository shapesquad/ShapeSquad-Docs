# Compatibility

Artlets uses a new graphics API called WebGPU to carry out high-performance computations in the browser. WebGPU is still a new technology, but it's already pretty well supported by browsers. 

Hiccups can happen though, so here's all the information you need to run Artlets smoothly on Windows, MacOS and Linux.

For a detailed compatibility report you can check out the [WebGPU implementation status](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status).

## Windows

On Windows 10 and 11, use Chrome for best experience. Firefox nightly also supports WebGPU, but Chrome will give you a better time.

## MacOS

Chrome gives you the best experience. Starting from macOS Tahoe 26, you can also use Safari.

## Linux

Chrome gives you the best experience. However by default Chrome will not have WebGPU support, you need to enable it yourself.

- First, enable the experimental WebGPU flag in Chrome: go to **chrome://flags** and enable *Unsafe WebGPU support*.

- Now, launch Chrome with this command line argument 

        google-chrome --ozone-platform=x11 --enable-features=Vulkan,VulkanFromANGLE,DefaultANGLEVulkan
