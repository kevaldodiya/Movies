function printDate(date) {
    let dateObj = new Date(date);
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    return (
        dateObj.getDate() +
        " " +
        monthNames[dateObj.getMonth()] +
        " " +
        dateObj.getFullYear()
    );
}
function formatMoneyCount(count) {
    if (count < 1000) {
        return count;
    } else if (count < 1000000) {
        return Math.floor(count / 1000) + " k";
    } else if (count < 1000000000) {
        return Math.floor(count / 1000000) + " M";
    } else if (count < 1000000000000) {
        return Math.floor(count / 1000000000) + " B";
    } else {
        return Math.floor(count / 1000000000) + " T";
    }
}
function formatVoteCount(voteCount) {
    return voteCount > 1000 ? Math.round(voteCount / 1000) + "k" : voteCount;
}
function printTime(time) {
    return time >= 60 ? Math.floor(time / 60) + " hr " + (time % 60) : time;
}

export { printDate, formatMoneyCount, formatVoteCount, printTime };
