export default {
	toFullTime() {
		/*返回yyyy-mm-dd hh:mm:ss 时间格式*/
		let [year, month, day, h, m, s, time] = [0, 0, 0, 0, 0];
		let data = new Date();
		year = data.getFullYear();
		month = data.getMonth() + 1;
		day = data.getDate().toString().padStart(2, '0');
		h = data.getHours().toString().padStart(2, '0');
		m = data.getMinutes().toString().padStart(2, '0');
		s = data.getSeconds().toString().padStart(2, '0');
		time = `${year}-${month}-${day} ${h}:${m}:${s}`;
		return time;
	},
	toTimeStamp(yymmdd) {
		/*返回 yyyy-mm-dd hh:mm:ss 的时间戳*/
		yymmdd = yymmdd.replace(/-/g, '/');
		let date = new Date(yymmdd);
		return date.getTime();
	},
	getLocalTime(nS) {
		//将时间戳（十三位时间搓，也就是带毫秒的时间搓）转换成时间格式2018-10-09
		let date = new Date(nS);
		let year = date.getFullYear();
		let month = date.getMonth()+1;
		let day = date.getDate();
		month = month < 10 ? "0"+month:month;
		day = day < 10 ? "0"+day:day;
		date = year+'-'+month+'-'+day;
		// console.log(date); // 2018-10-09
		return date;
	}
}
