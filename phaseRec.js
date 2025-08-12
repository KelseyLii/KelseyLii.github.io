function initPhaseRecognition() {
    const mainVideo = document.getElementById('mainVideo');

    // 检查主视频元素是否存在
    if (!mainVideo) {
        console.error('mainVideo element not found');
        return;
    }

    // 获取所有phase元素
    const phaseElements = {
        phase1: document.getElementById('phase1'),
        phase2: document.getElementById('phase2'),
        phase3: document.getElementById('phase3'),
        phase4: document.getElementById('phase4'),
        phase5: document.getElementById('phase5')
    };

    // 检查所有phase元素是否存在
    const missingElements = Object.keys(phaseElements).filter(key => !phaseElements[key]);
    if (missingElements.length > 0) {
        console.error('Missing phase elements:', missingElements);
        return;
    }

    function resetAllPhases() {
        Object.values(phaseElements).forEach(element => {
            if (element) {
                element.classList.remove('active');
            }
        });
    }

    function updatePhaseByVideo() {
        resetAllPhases();
        const src = mainVideo.currentSrc || mainVideo.src;
        if (!src) return;

        if (src.includes('video1-1') || src.includes('video1-2')) {
            phaseElements.phase2.classList.add('active');
        } else if (src.includes('video2-3')) {
            phaseElements.phase3.classList.add('active');
        } else if (src.includes('video1')) {
            phaseElements.phase2.classList.add('active');
        }
    }

    // 监听视频src变化和play事件
    mainVideo.addEventListener('play', updatePhaseByVideo);
    mainVideo.addEventListener('loadedmetadata', updatePhaseByVideo);

    // 初始化时执行一次
    updatePhaseByVideo();

    // 可选：暴露控制方法
    window.phaseControl = {
        reset: resetAllPhases,
        update: updatePhaseByVideo
    };
}

// 初始化函数
document.addEventListener('DOMContentLoaded', () => {
    initPhaseRecognition();
});

