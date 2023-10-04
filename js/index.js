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

fetchTable('../public/json/timeTable.json')
  .then(jsonData => {
		sTable(jsonData)
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

const calcTime = (hour, minutes, duration) => {
	const totalMinutes = minutes + duration;
	const newHour = hour + Math.floor(totalMinutes / 60);
	const newMinutes = totalMinutes % 60;

	return `${hour}時${minutes}分~${newHour}時${newMinutes}分`;
};
const sTableFlame = (id, header, body) => {
	const timeTable = []
	const tableBody = [
		'<tbody>',
			'<tr>',
				'<th colspan="2">',
					id,
				'</th>',
			'</tr>',
			'<tr>',
				'<th>名前</th>',
				'<th>時間</th>',
			'</tr>',
			'<tr>',
				'<th>',
					header,
				'</th>',
				'<td>',
					calcTime(...body),
				'</td>',
			'</tr>',
		'</tbody>']
	timeTable.push(...tableBody)
	return timeTable.join('')
}
const getDate = () => {
	const date = new Date();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return [month, day, hours, minutes]
}
const timeData = () => {
	const timeTable = document.getElementById('time-table')
	const dateFrame = timeTable.querySelector('h3')
	const updateDate = () => {
		const date = getDate()
		const formattedDate = `現在時刻: ${date[0]}月${date[1]}日${date[2]}時${date[3]}分`;
		dateFrame.innerHTML = formattedDate;
	};
	setInterval(updateDate, 1000);
}
const sTable = (json) => {
	const date = getDate()
	console.log(date)
	const filterData = (category, date, json) => {
		return json[category].filter((stage) => {
			const stageTotalMinutes = stage.time.hour * 60 + stage.time.minutes;
			const desiredTotalMinutes = date[2] * 60 + date[3];
			return (
				stage.date.month === date[0] &&
				stage.date.day === date[1] &&
				stageTotalMinutes <= desiredTotalMinutes &&
				stageTotalMinutes + stage.duration >= desiredTotalMinutes
			);
		});
	}
	const filterDatas = [
		["stage", filterData("stage", date, json)[0]],
		["ONED", filterData("ONED", date, json)[0]]
	]
	console.log(filterDatas)
	filterDatas.map((item) => {
		console.log(item[0])
		const json = item[1]
		const docData = document.getElementById(item[0])
		docData.innerHTML = sTableFlame(item[0], json.title, [json.time.hour, json.time.minutes, json.duration])
	})
}
