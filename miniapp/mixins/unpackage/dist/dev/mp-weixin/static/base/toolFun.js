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
	}
}
