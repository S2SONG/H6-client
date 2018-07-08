import moment from 'moment';
export const util = {};

util.timeSince = (date) => {
    if(date == null || date == undefined)
        return "";

    let seconds = Math.floor((new Date(moment().utc(moment().format())) - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " 년전";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " 달전";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " 일전";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " 시간전";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " 분전";
    }
    return Math.floor(seconds) + " 초전";
};

util.timeToFormat = (date, format) => {
    let time = moment(date).format(format);
    return time;
};

util.getTimerSecond = (date) => {
    let seconds = Math.floor(new Date(date) - new Date(moment().utc(moment().format())));
    return seconds;
};