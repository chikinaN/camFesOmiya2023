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

fetchNav('../public/json/pagelist.json')
  .then(jsonData => {
		navList(jsonData)
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

const searchIdData = () => {
  const sectionElements = document.querySelectorAll('body > article > section');
  const result = [];
  sectionElements.forEach(section => {
    const h2Element = section.querySelector('h2');
    const id = section.getAttribute('id');
    const jaName = h2Element ? h2Element.textContent : section.getAttribute('jaName') || '';
    result.push({ name: id, title: jaName });
  });

  return result;
}
const buildCurrentMenu = (length) => {
  const idData = searchIdData();
  const navList = [];
  idData.map((page) => {
    const pageLink = page.name != null ?
      `<li${navList.length === length ? ' class="currentLink"' : ''}><a href="#${page.name}">${page.title}</a></li>`
      : `<li>${page.title}</li>`;
    navList.push(pageLink);
  });
  return navList.join(' ');
}

const buildLinkMenu = (pageList, currentName) => {
  const navList = ["<ul id='linkMenu'>"]
	pageList.map((page) => {
		const pageLink = currentName == page.name?`
			<li class='currentLink'>
				<a href="${page.path}">${page.jaName}</a>
			</li>`:
      `
			<li>
				<a href="${page.path}">${page.jaName}</a>
			</li>`
		navList.push(pageLink)
	})
	navList.push('</ul>')
  return navList.join(' ')
}

const navList = (pageList) => {
  const path = location.pathname
  const currentData = pageList.filter((data) => data.path == path)[0]
  const h3Title = '<h3>キャンフェス<br>〜京都〜<br>In大宮</h3>'
  const icon = '<img src="public/img/camfes2023_logo_min.png" alt="icon" id="icon">'
  const menuTitle = "<header id='menuTitle'>" + h3Title + icon + '<h5 id="testData">1</h5></header>'
  const currentMenu = "<ul id='currentMenu'>" + buildCurrentMenu(0) + '</ul>'
	const menu = document.getElementById("nav-list");
  const LinkMenu = buildLinkMenu(pageList, currentData.name)
	menu.innerHTML = menuTitle + currentMenu + LinkMenu
}
const article = document.querySelectorAll('body > article')[0]
const getCurrentSection = () => {
  const sections = document.querySelectorAll('body > article > section');
  const scrollPosition = article.scrollTop;
  let currentSection = 0;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.clientHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      document.getElementById('testData').innerHTML = i
      currentSection = i;
      break;
    }
  }

  return currentSection;
}
const setCurrentMenu = (indexNumber) => {
  const currentMenu = document.getElementById('currentMenu')
  currentMenu.innerHTML = buildCurrentMenu(indexNumber)
}
const setSideIndex = (indexNumber) => {
  const idData = searchIdData();
  const sideIndex = document.getElementById('sideIndex')
  const sections = document.querySelectorAll('body > article > section');
  const innerData = []
  for (let i = 0; i < sections.length; i++) {
    const li = `<li ${i ==indexNumber ?"class='current'": ''}><a href=#${idData[i].name}></a></li>`;
    innerData.push(li)
  }
  sideIndex.innerHTML = innerData.join(' ')
}
setSideIndex(0)
let lastSectionNumber = 0
article.addEventListener('scroll', () => {
  const currentSectionIndex = getCurrentSection();
  if (lastSectionNumber != currentSectionIndex) {
    lastSectionNumber = currentSectionIndex
    setCurrentMenu(lastSectionNumber)
    setSideIndex(lastSectionNumber)
  }
});


const menu = document.getElementById("nav-list");
menu.addEventListener('click', function(event) {
  if (event.target.tagName === 'A') {
    document.getElementById('nav-menu').checked = false;
  }
});