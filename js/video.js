function initVideoPlaceholder() {
    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function () {
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', 'https://www.youtube.com/embed/iYAX4fxC2A4?autoplay=1');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');

            // Ensure full overlay sizing
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';

            const videoWrapper = document.querySelector('.league-video-wrapper');
            videoWrapper.innerHTML = '';
            videoWrapper.appendChild(iframe);
        });
    }
}
