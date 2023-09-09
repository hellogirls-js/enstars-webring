async function createWebringNav() {
  const res = await fetch("https://webring.hellogirls.info/src/webring.html");
  const webringHTML = await res.text();

  const jsonRes = await fetch("https://webring.hellogirls.info/src/sites.json");
  const sitesData = await jsonRes.json();
  console.log(sitesData);
  
  const currentSiteIndex = sitesData.findIndex((site) => site.site_url === window.location.href);

  if (currentSiteIndex > -1) {
    const webringDiv = document.createElement("div");
    webringDiv.innerHTML = webringHTML;

    document.body.style.margin = 0;
    document.body.style.paddingTop = "12vh";
    document.body.prepend(webringDiv);

    document.getElementById("webring__nav-subtitle-name").innerHTML = sitesData[currentSiteIndex].site_name;
    document.getElementById("webring__nav-subtitle-credit").innerHTML = `<a href=${sitesData[currentSiteIndex].author_credit}>${sitesData[currentSiteIndex].author_name}</a>`;
    
    document.getElementById("webring__prev").onclick = () => {
      window.location.href = sitesData[currentSiteIndex === 0 ? sitesData.length - 1 : currentSiteIndex - 1].site_url;
    }

    document.getElementById("webring__list").onclick = () => {
      document.getElementById("webring__nav-content").style.display = document.getElementById("webring__nav-content").style.display === "block" ? "none" : "block";
      document.getElementById("webring__nav-content").innerHTML = "<h2>list of sites</h2>";

      for (let i = 0; i < sitesData.length; i++) {
        document.getElementById("webring__nav-content").innerHTML += `<div class="webring__site-list-item webring__site-list-${i % 2 === 0 ? "even" : "odd"}"><a href="${sitesData[i].site_url}">${sitesData[i].site_name}</a> by <a href="${sitesData[i].author_credit}">${sitesData[i].author_name}</a></div>`
      }
    }

    document.getElementById("webring__expand").onclick = () => {
      document.getElementById("webring__nav-content").style.display = document.getElementById("webring__nav-content").style.display === "block" ? "none" : "block";
      document.getElementById("webring__nav-content").innerHTML = `<h2>about this webring</h2>
      <p>this webring is managed by <a href="https://twitter.com/hellogirls_DEV">son</a>. want to add a website to this ring? <a href="https://forms.gle/1DCz3XzNDE3NeQc47">submit your site here!</a></p>`;
    }

    document.getElementById("webring__random").onclick = () => {
      let randomIndex = Math.floor(Math.random() * sitesData.length);
      window.location.href = sitesData[randomIndex].site_url;
    }

    document.getElementById("webring__next").onclick = () => {
      window.location.href = sitesData[currentSiteIndex === sitesData.length - 1 ? 0 : currentSiteIndex + 1].site_url;
    }
  }
}


window.onload = () => {
  createWebringNav();
}