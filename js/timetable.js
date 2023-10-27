const fetchTable = async (url) => {
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

fetchTable('public/json/timeTable.json')
  .then(jsonData => {
		createTimeTable(jsonData)
		setDataLine()
		setInterval(setDataLine, 1000);
		nowScroll()
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

const createTimeTable = (timeData) => {
	const changeTimeTable = () => {
		const hash = window.location.hash == ''? window.location.hash.substring(1): 'stage'
		timeTableElement(timeData, hash)
	}
	changeTimeTable()
	window.addEventListener('hashchange',changeTimeTable)
}
const idName = [
	{
		name: "stage",
		jaName: "ステージ"
	},{
		name: "ONED",
		jaName: "ONED"
	},{
		name: "DJ",
		jaName: "DJ企画"
	},{
		name: "smashBros",
		jaName: "スマブラ企画"
	}
]
const formatIdName = (id) => {
	return idName.find(item => item.name === id).jaName;
}
const timeTableElement = (data, hash) => {
	const table = document.getElementById('tableWrap')
	const tableContent = []
	tableContent.push('<div class="tableMain">')
	tableContent.push('<ul class="time-head">')
	createTimeData().forEach(time => {
		tableContent.push(`<li>${time}</li>`)
	})
	tableContent.push('</ul>')
	tableContent.push("<div id='table-line'></div>")
	tableContent.push('<div class="time-main">')
	Object.keys(data).forEach(key => {
		tableContent.push(`<ul id="${key}">`)
		tableContent.push(`<li class="table-title">${formatIdName(key)}</li>`)
		data[key].forEach(keyData => {
			const formatTime = (item) => {
				return (item.hour - 13) * 60 + item.minutes;
			}
			tableContent.push(`<li style="--require-time: ${keyData.timeRequired}; --until-date: ${formatTime(keyData.time)};"><span>${keyData.title}</span>${keyData.performer != ''?`<span class='performer'>${keyData.performer}</span>` : ''}</li>`)
		})
		tableContent.push('</ul>')
	})
	table.innerHTML = tableContent.join(' ')
}
const createTimeData = () => {
  const startHour = 13;
  const startMinute = 0;
  const endHour = 17;
  const endMinute = 0;
  const interval = 15;
  const times = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = (hour === startHour ? startMinute : 0); minute < 60; minute += interval) {
      if (hour === endHour && minute == endMinute) {
        break;
      }

      const formattedHour = String(hour).padStart(2, '0');
      const formattedMinute = String(minute).padStart(2, '0');
      times.push(`${formattedHour}:${formattedMinute}`);
    }
  }
	times.push('17:00')

  return times;
}

const dropdown = document.querySelector(".dropdown");
const button = dropdown.querySelector(".drop-btn");
const dropdownLayer = dropdown.querySelector(".drop-wrap");
const dropdownMenu = dropdown.querySelector(".drop-menu");

button.addEventListener("click", () => {
	const rect = button.getBoundingClientRect();
	dropdownMenu.style.top = `${rect.top + rect.height - 1}px`;
	dropdownMenu.style.left = `${rect.left}px`;
	dropdownMenu.style.minWidth = `${rect.width}px`;
	dropdownLayer.classList.add("drop-open");
});

dropdownLayer.addEventListener("click", () => {
	dropdownLayer.classList.remove("drop-open");
});

const items = dropdownMenu.querySelectorAll("li");

items.forEach((item) => {
	item.addEventListener("click", () => {
		button.innerText = item.innerText;
		window.location.hash = encodeURIComponent(item.getAttribute('data-link'));
		items.forEach((i) => {
				i.classList.remove("active-item");
		});
		item.classList.add("active-item");
		dropdownLayer.classList.remove("drop-open");
	});
});



const getDate = () => {
	const date = new Date();
	const hours = date.getHours() - 13;
	const minutes = date.getMinutes();
	return date.getHours() < 17 ? [hours, minutes]: [0,0]
}
const setDataLine = () => {
	const date = getDate()
	document.getElementById('table-line').style.setProperty('--position', date[0] * 60 + date[1]);
}
const nowScroll = () => {
	const date = getDate()
	document.getElementById('tableWrap').scrollLeft = (date[0] * 60 + date[1]) * 10
}
