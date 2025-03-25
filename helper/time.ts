export const formatLastUpdated = (lastUpdated:string) => {
    const date = new Date(lastUpdated);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const timeString = date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return isToday ? `Today at ${timeString}` : date.toLocaleString('en-IN');
};
