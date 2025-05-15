// Main script file for YouTube Downloader

document.addEventListener('DOMContentLoaded', () => {
    // Code to run after the DOM is fully loaded
    console.log('DOM fully loaded and parsed');

    // Update copyright year dynamically
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear().toString();
    }

    // Example: Add event listeners for buttons, handle form submissions, etc.
    // const convertBtn = document.getElementById('convert-btn');
    // const urlInput = document.getElementById('youtube-url');

    // if (convertBtn && urlInput) {
    //     convertBtn.addEventListener('click', () => {
    //         const youtubeUrl = urlInput.value;
    //         if (youtubeUrl) {
    //             console.log('Converting URL:', youtubeUrl);
    //             // Add actual conversion logic here
    //         } else {
    //             alert('Please paste a YouTube URL.');
    //         }
    //     });
    // }
	
	const convertBtn = document.getElementById('convert-btn');
	const videoUrlInput = document.getElementById('youtube-url');
	const progressSection = document.getElementById('progressSection');
	const progressBar = document.getElementById('progressBar');
	const progressPercent = document.getElementById('progressPercent');
	const resultSection = document.getElementById('resultSection');
	const videoPreview = document.getElementById('videoPreview');
	const downloadBtn = document.getElementById('downloadBtn');
	
	// 模拟的视频数据
	const sampleVideoData = {
		formats: [
		    { resolution: '1080x1920', size: '7.69M', url: '#', quality: 'HD' },
		],
		audioFormats: [
		    { quality: '高品质', size: '0.30M', url: '#' },
		],
		previewUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
	};
	
	// 下载按钮功能
	convertBtn.addEventListener('click', async function() {
		// 检查URL是否为空
		if (!videoUrlInput.value.trim()) {
			alert('请输入YouTube视频链接');
			return;
		}
	
		// 显示进度条
		progressSection.style.display = 'block';
	
		// 下载视频
		const downloadResult = await downloadVideo(videoUrlInput.value);
	
		sampleVideoData.previewUrl = downloadResult.data
	
		if (downloadResult.code !== 1) {
			throw new Error(downloadResult.msg);
		}
	
		// 模拟解析进度
		let progress = 0;
		const interval = setInterval(function() {
			progress += 2;
			progressBar.style.width = progress + '%';
			progressPercent.textContent = progress;
	
			if (progress >= 100) {
				clearInterval(interval);
				// 显示解析结果
				setTimeout(function() {
					progressSection.style.display = 'none';
					showResults(sampleVideoData);
				}, 500);
			}
		}, 100);
	});
	
	// 显示解析结果
	function showResults(data) {
		// 显示结果区域
		resultSection.style.display = 'block';
	
		// 设置视频预览
		// 注意：真实应用中，这里应该设置为实际解析到的视频预览URL
		videoPreview.src = data.previewUrl;
	
		// 添加视频下载选项
		downloadBtn.addEventListener('click', function() {
			alert(`正在下载 [1080*1920] 格式的视频`);
			
			// ✅ 真实下载逻辑开始
			const downloadFile = async () => {
				try {
					// 方案1：直接下载（适用于同源或CORS允许的静态文件）
					const link = document.createElement('a');
					link.href = data.previewUrl; // 使用接口返回的真实URL
					link.download = `video_1080*1920.mp4`; // 设置文件名
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				} catch (error) {
					console.error('下载失败:', error);
					alert(`下载失败: ${error.message}`);
				}
			};
		
			// 启动下载流程
			downloadFile();
		});
	}
});

// Utility functions (if any) 