function generateTimetable(n) {
    if (n % 2 !== 0) {
        throw new Error("Parameter must be an even number.");
    }

    const mathClassrooms = [];
    const ArabClassrooms = [];

    for (let i = 1; i <= n; i++) {
        if (i % 2 === 0) {
            ArabClassrooms.push(i);
        } else {
            mathClassrooms.push(i);
        }
    }

    const openingHours = [
        { day: "lundi", hours: ["09:00", "2:00", "6:00"] },
        { day: "mercredi", hours: ["09:00", "2:00", "6:00"] },
        { day: "vendredi", hours: ["09:00", "2:00", "6:00"] }
    ];

    const numberOfGroups = Math.min(mathClassrooms.length, ArabClassrooms.length) * 3;
    const groups = Array.from({ length: numberOfGroups }, (_, i) => `Group ${i + 1}`);

    const getRandomElement = arr => arr[Math.floor(Math.random() * arr.length)];

    const schedule = [];

    groups.forEach(group => {
        const days = openingHours.map(oh => oh.day);
        const firstSessionDay = getRandomElement(days);
        let secondSessionDay;

        do {
            secondSessionDay = getRandomElement(days);
        } while (Math.abs(days.indexOf(firstSessionDay) - days.indexOf(secondSessionDay)) <= 1);

        const firstSessionTime = getRandomElement(openingHours.find(oh => oh.day === firstSessionDay).hours);
        const secondSessionTime = getRandomElement(openingHours.find(oh => oh.day === secondSessionDay).hours);

        const subjects = ["Math", "Arab"];
        const firstSessionSubject = getRandomElement(subjects);
        const secondSessionSubject = firstSessionSubject === "Math" ? "Arab" : "Math";

        const firstSessionClassroom = getRandomElement(firstSessionSubject === "Math" ? mathClassrooms : ArabClassrooms);
        const secondSessionClassroom = getRandomElement(secondSessionSubject === "Math" ? mathClassrooms : ArabClassrooms);

        schedule.push({
            group,
            day: firstSessionDay,
            time: firstSessionTime,
            subject: firstSessionSubject,
            classroom: firstSessionClassroom
        });

        schedule.push({
            group,
            day: secondSessionDay,
            time: secondSessionTime,
            subject: secondSessionSubject,
            classroom: secondSessionClassroom
        });
    });

    console.log(schedule);
    return schedule;
}