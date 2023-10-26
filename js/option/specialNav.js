const fetchNav = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
const formatLink = (path) => {
	return location.pathname.indexOf('/camFesOmiya2023') == -1? path : '/camFesOmiya2023' + path
}

fetchNav(formatLink('/public/json/pagelist.json'))
  .then(jsonData => {
		navList(jsonData)
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
const buildCurrentMenu = () => {
  const idData = [
		{
			name: '/projectsDetail/DJ.html',
			title: 'CLUB Rhelok'
		},{
			name: '/projectsDetail/JapaneseGames.html',
			title: '童心に帰って遊ぼう！〜昔あそび×大宮キャンパス〜'
		},{
			name: '/projectsDetail/ONED.html',
			title: 'ONED'
		},{
			name: '/projectsDetail/oracle.html',
			title: '☆ドキドキ♡キャンフェスおみくじ☆'
		},{
			name: '/projectsDetail/scrunchie.html',
			title: '［無料体験ワークショップ］ちりめんものづくり体験！'
		},{
			name: '/projectsDetail/smashBros.html',
			title: 'スマブラ大会in大宮'
		}
	]
	const formatTitle = (str) => {
		if (str.length > 8) {
			return str.slice(0, 6) + '...';
		} else {
			return str;
		}
	}
  const navList = [];
  idData.map((page) => {
    const pageLink = `<li><a href="${formatLink(page.name)}">${formatTitle(page.title)}</a></li>`
    navList.push(pageLink);
  });
  return navList.join(' ');
}

const buildLinkMenu = (pageList) => {
  const navList = ["<ul id='linkMenu'>"]
	pageList.map((page) => {
    const pagePath = location.pathname.indexOf('/camFesOmiya2023') == -1? page.path : '/camFesOmiya2023' + page.path
		const pageLink =`
			<li>
				<a href="${pagePath}">${page.jaName}</a>
			</li>`
		navList.push(pageLink)
	})
	navList.push('</ul>')
  return navList.join(' ')
}

const navList = (pageList) => {
  const h3Title = '<h3>キャンフェス<br>〜京都〜<br>In大宮</h3>'
  const icon = '<img src="../public/img/camfes2023_logo.jpg" alt="icon" id="icon">'
  const menuTitle = "<header id='menuTitle'>" + h3Title + icon + '</header>'
  const currentMenu = "<ul id='currentMenu'>" + buildCurrentMenu(0) + '</ul>'
	const menu = document.getElementById("nav-list");
  const LinkMenu = buildLinkMenu(pageList)
	menu.innerHTML = menuTitle + currentMenu + LinkMenu
}

const menu = document.getElementById("nav-list");
menu.addEventListener('click', function(event) {
  if (event.target.tagName === 'A') {
    document.getElementById('nav-menu').checked = false;
  }
});
