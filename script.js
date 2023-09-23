document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calculateButton').addEventListener('click', calculatePoints);
});

function calculatePoints() {
    const candidateName = document.getElementById('candidateName').value;
    const currentRank = document.getElementById('currentRank').value;
    const activityPoints = parseInt(document.getElementById('activityPoints').value);
    const performancePoints = parseInt(document.getElementById('performancePoints').value);
    const specialPoints = parseInt(document.getElementById('specialPoints').value);

    const startingPoints = {
        'Jr. Helper': 100,
        'Helper': 200,
        'GM': 400,
        'Jr. Admin': 800,
        'Admin': 1600
    };

    const weightAP = {
        'Jr. Helper': 1,
        'Helper': 1,
        'GM': 1,
        'Jr. Admin': 1,
        'Admin': 1
    };

    const weightPP = {
        'Jr. Helper': 1,
        'Helper': 1,
        'GM': 1,
        'Jr. Admin': 1,
        'Admin': 1
    };

    const requiredPointsForNextRank = {
        'Jr. Helper': 200,
        'Helper': 400,
        'GM': 800,
        'Jr. Admin': 1600,
        'Admin': 3200
    };

    const totalPoints = startingPoints[currentRank] +
        (activityPoints * weightAP[currentRank]) +
        (performancePoints * weightPP[currentRank]) +
        specialPoints;

    const resultElement = document.getElementById('result');
    let promotionStatus = '';

    if (totalPoints >= requiredPointsForNextRank[currentRank]) {
        const nextRank = getNextRank(currentRank);
        promotionStatus = `Congratulations, ${candidateName}! You have been promoted to the rank of ${nextRank}. This is a significant achievement, and we appreciate your dedication and hard work. Your contributions have not gone unnoticed, and we believe you'll continue to excel in your new role.`;
    } else {
        promotionStatus = `Sorry, ${candidateName}. We take our promotion process seriously, and your current performance and contributions do not meet the criteria for promotion at this time. However, this should not discourage you. We encourage you to keep working hard, improving your skills, and seeking opportunities to contribute positively to our community. With continued effort, you can achieve your goal of promotion in the future.`;
    }

    // Create a text file with the promotion status
    createPromotionTextFile(candidateName, promotionStatus);

    resultElement.textContent = promotionStatus;
}

function getNextRank(currentRank) {
    const ranks = ['Jr. Helper', 'Helper', 'GM', 'Jr. Admin', 'Admin'];
    const currentIndex = ranks.indexOf(currentRank);
    return currentIndex === -1 ? null : ranks[currentIndex + 1];
}

function createPromotionTextFile(candidateName, message) {
    const fileName = `${candidateName}.txt`;
    const fileContent = `Dear ${candidateName},\n\n${message}`;

    // Create a Blob containing the file content
    const blob = new Blob([fileContent], { type: 'text/plain' });

    // Create a download link and trigger a click event to download the file
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}
