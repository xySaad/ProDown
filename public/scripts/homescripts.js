document.addEventListener("DOMContentLoaded",()=>{const mobileNavBar=document.getElementById("mobile-navbar");document.getElementById("barToggle").addEventListener("click",()=>{mobileNavBar.classList.toggle("active")}),toastTxt1=document.getElementById("toast-txt1"),toastTxt2=document.getElementById("toast-txt2"),toast=document.querySelector(".toast"),closeIcon=document.querySelector(".close"),progress=document.querySelector(".progress"),overlay=document.querySelector(".overlay");let toastTimer1,toastTimer2;const openToast=()=>{overlay.style.display="block",toast.classList.add("active"),progress.classList.add("active"),toastTimer1=setTimeout(()=>{toast.classList.remove("active"),overlay.style.display="none"},5e3),toastTimer2=setTimeout(()=>{progress.classList.remove("active")},5300)},darkModeToggle=(closeIcon.addEventListener("click",()=>{toast.classList.remove("active"),setTimeout(()=>{progress.classList.remove("active"),overlay.style.display="none"},300),clearTimeout(toastTimer1),clearTimeout(toastTimer2)}),document.getElementById("darkModeToggle")),body=document.body;"true"===localStorage.getItem("darkModePreference")&&(body.classList.add("dark-mode"),darkModeToggle.checked=!0),darkModeToggle.addEventListener("click",()=>{body.classList.toggle("dark-mode");var isDarkModeEnabled=body.classList.contains("dark-mode");localStorage.setItem("darkModePreference",isDarkModeEnabled)});const menuToggle=document.querySelector(".menu-toggle"),leftMenu=document.querySelector(".history-menu"),closeMenu=()=>{leftMenu.classList.remove("active")};menuToggle.addEventListener("click",()=>{mobileNavBar.classList.remove("active"),leftMenu.classList.toggle("active"),renderVideoHistory()}),document.addEventListener("click",event=>{leftMenu.contains(event.target)||menuToggle.contains(event.target)||darkModeToggle.contains(event.target)||closeMenu()}),window.addEventListener("scroll",()=>{leftMenu.classList.contains("active")&&closeMenu()});const modal=document.getElementById("myModal");var closeBtn=document.querySelector(".close");const videoThumbnailElem=document.getElementById("videoThumbnail");var form=document.querySelector("form");const videoInfo=document.getElementById("videoInfo"),videoTitleElem=document.getElementById("videoTitle"),authorElem=document.getElementById("vidAuthor"),loadingIndicator=document.getElementById("loadingIndicator"),formatsBtnsElm=document.getElementById("formatsBtns"),tikVideoThumbnailElem=document.getElementById("tikVideoThumbnail"),tikVideoInfo=document.getElementById("tikInfo"),tikAuthorElem=document.getElementById("tikVidAuthor"),tikFormatsBtnsElm=document.getElementById("tikFormatsBtns");form.addEventListener("submit",async event=>{event.preventDefault();const inputUrl=document.getElementById("urlInput").value;var formatButtonSD,formatButtonHD,formatButtonAudio;let urlType="";if(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.*/i.test(inputUrl))urlType="youtube";else if(/^(https?:\/\/)?(www\.|vm\.)?tiktok\.com\/.*/i.test(inputUrl))urlType="tiktok";else{if(!/^(https?:\/\/)?(m\.)?(www\.)?facebook\.com\/.*/i.test(inputUrl))return toastTxt1.innerHTML="Invalid Link",toastTxt2.innerHTML="Please enter a supported link.",void openToast();urlType="facebook"}try{if(overlay.style.display="block",loadingIndicator.style.display="block",videoInfo.style.display="none",videoTitleElem.innerHTML="",formatsBtnsElm.innerHTML="",authorElem.innerHTML="",tikVideoInfo.style.display="none",tikFormatsBtnsElm.innerHTML="",tikAuthorElem.innerHTML="","youtube"===urlType){var response=await fetch("/ytinfo?ytUrl="+inputUrl);if(!response.ok)throw(await response.text()).includes("Video unavailable")?new Error("YouTube video is unavailable"):new Error("Failed to fetch YouTube video info. Status: "+response.status);var data=await response.json();if(data.videoDetails){var{title,thumbnail,qualities,audio,author}=data.videoDetails,videoDetails=(videoTitleElem.textContent=title,videoThumbnailElem.src=thumbnail,videoThumbnailElem.style.display="block",videoInfo.style.display="flex",qualities.forEach(format=>{var formatButton=document.createElement("button");formatButton.innerHTML=`${format.quality} - video/mp4 <br> <span style="color: black;">${format.fileSize}</span>`,formatButton.addEventListener("click",()=>{window.open(`/download-yt?itag=${format.itag}&ytUrl=`+inputUrl)}),formatsBtnsElm.appendChild(formatButton)}),audio.forEach(format=>{var formatButton=document.createElement("button");formatButton.innerHTML=`${format.bitrate}kbps - audio <br> <span style="color: black;">${format.fileSize}</span>`,formatButton.addEventListener("click",()=>{window.open(`/download-yt?itag=${format.itag}&ytUrl=`+inputUrl)}),formatsBtnsElm.appendChild(formatButton)}),authorElem.textContent="Author: "+author.user,videoInfo.appendChild(authorElem),{title:title,url:inputUrl,thumbnail:thumbnail});let videoHistory=JSON.parse(localStorage.getItem("videoHistory"))||[];videoHistory.unshift(videoDetails);videoHistory=videoHistory.slice(0,10),localStorage.setItem("videoHistory",JSON.stringify(videoHistory))}}else if("tiktok"===urlType){const response=await fetch("/tikinfo?tikUrl="+inputUrl);if(!response.ok){const responseData=await response.text();throw responseData.includes("Video unavailable")?new Error("TikTok video is unavailable"):new Error(`Failed to fetch ${urlType} video info. Status: `+response.status)}const data=await response.json();if(data.title){const{title,thumbnail,sd,hd,audio,author}=data;videoTitleElem.textContent=title,tikVideoThumbnailElem.src=thumbnail,tikVideoThumbnailElem.style.display="block",tikVideoInfo.style.display="block",sd&&((formatButtonSD=document.createElement("button")).innerHTML="Download SD <br> MP4",formatButtonSD.addEventListener("click",()=>{window.open(sd)}),tikFormatsBtnsElm.appendChild(formatButtonSD)),hd&&((formatButtonHD=document.createElement("button")).innerHTML=`Download HD <br> MP4
            `,formatButtonHD.addEventListener("click",()=>{window.open(hd)}),tikFormatsBtnsElm.appendChild(formatButtonHD)),audio&&((formatButtonAudio=document.createElement("button")).innerHTML="Download MP3 <br> Audio",formatButtonAudio.addEventListener("click",()=>{window.open(audio),console.log("Audio link: ",audio)}),tikFormatsBtnsElm.appendChild(formatButtonAudio)),author&&(tikAuthorElem.textContent="Author: "+author,tikVideoInfo.appendChild(authorElem))}}else if("facebook"===urlType)try{const response=await fetch("http://127.0.0.1:5000/dl",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({Url:inputUrl})});if(!response.ok)throw new Error("HTTP error! Status: "+response.status);const data=await response.json();if(!data)throw new Error("No data received from the server");{const{title,thumbnail,formats}=data;videoTitleElem.textContent=title,tikVideoThumbnailElem.src=thumbnail,tikVideoThumbnailElem.style.display="block",tikVideoInfo.style.display="block",formats.forEach(format=>{const{ext,filesize,resolution,url}=format;var format=resolution.dimensions||resolution.format_id,formatButton=document.createElement("button");formatButton.innerHTML=format+` - ${ext} <br> <span style="color: black;">${filesize}</span>`,formatButton.addEventListener("click",()=>{window.open(url+"&dl=1")}),tikFormatsBtnsElm.appendChild(formatButton)})}}catch(error){throw console.error("Error during fetch:",error.message),new Error("Can't connect to Facebook server. Please try again later.")}}catch(error){console.error("Error:",error),toastTxt1.innerHTML="ERROR",toastTxt2.innerHTML=""+error,openToast()}finally{loadingIndicator.style.display="none",toast.classList.contains("active")?overlay.style.display="block":overlay.style.display="none"}}),closeBtn.addEventListener("click",()=>{modal.style.display="none"}),window.addEventListener("click",event=>{event.target===modal&&(modal.style.display="none")})});