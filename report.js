// 获取DOM元素
const generateBtn = document.getElementById('generateBtn');
const modal = document.getElementById('imageModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const downloadBtn = document.getElementById('downloadBtn');
// const canvas = document.getElementById('reportCanvas');
// const ctx = canvas.getContext('2d');
const successMessage = document.getElementById('successMessage');
const reportImage = document.getElementById('reportImage');

// 生成报告图片
generateBtn.addEventListener('click', async function() {
    // 显示加载状态
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<span class="loading"></span>Generating...';
    
    // 模拟生成延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 生成报告图片
    // generateReportImage();
    
    // 显示预览弹窗
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 重置按钮状态
    generateBtn.disabled = false;
    generateBtn.innerHTML = 'Generate report';
});

// 下载图片
downloadBtn.addEventListener('click', function() {
        // 显示加载状态
        downloadBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                <path d="M21 12a9 9 0 11-6.219-8.56"></path>
            </svg>
            正在下载...
        `;
        
        // 创建虚拟链接触发下载
        const link = document.createElement('a');
        link.href = reportImage.src;
        link.download = `Report_${new Date().getTime()}.png`;

        // 同源图片直接下载???
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 显示成功消息
        showSuccessMessage();
        
        // 关闭弹窗
        closeModalFunction();
});

// 显示成功消息
function showSuccessMessage() {
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// 关闭弹窗
function closeModalFunction() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 绑定关闭事件
closeModal.addEventListener('click', closeModalFunction);
cancelBtn.addEventListener('click', closeModalFunction);

// 点击弹窗外部关闭
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModalFunction();
    }
});