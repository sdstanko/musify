export const formatTime = (duration: number): string => {
    const mins = Math.floor(duration / 60);
    let seconds = duration % 60;
    if (mins < 1) {
        if (seconds < 10) {
            return `0:0${seconds}`;
        } else {
            return `0:${seconds}`;
        }
    }
    if (seconds < 10) {
        return `${mins}:0${seconds}`;
    }
    return `${mins}:${seconds}`;
};
