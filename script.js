// Welcome to the Staff Promotion System
// This system can be used to calculate and manage promotions for your organization.

// Listen for the document to be fully loaded before initializing the system.
document.addEventListener('DOMContentLoaded', function () {
    // Find the 'Calculate' button element by its ID.
    const calculateButton = document.getElementById('calculateButton');
    
    // Check if the 'Calculate' button exists.
    if (calculateButton) {
        // Add a click event listener to the 'Calculate' button.
        calculateButton.addEventListener('click', handlePromotionCalculation);
    }
});

// Function to handle the promotion calculation.
function handlePromotionCalculation() {
    // Retrieve input elements from the HTML.
    const candidateNameInput = document.getElementById('candidateName');
    const currentRankInput = document.getElementById('currentRank');
    const activityPointsInput = document.getElementById('activityPoints');
    const performancePointsInput = document.getElementById('performancePoints');
    const specialPointsInput = document.getElementById('specialPoints');
    const resultElement = document.getElementById('result');
    resultElement.classList.add('show');

    // Check if any of the required fields are empty.
    if (
        !candidateNameInput.value ||
        !currentRankInput.value ||
        !activityPointsInput.value ||
        !performancePointsInput.value ||
        !specialPointsInput.value
    ) {
        // Display a message to the user if any required fields are empty.
        resultElement.textContent = 'Please fill in all required fields.';
        return;
    }

    // Retrieve input values from the HTML.
    const candidateName = candidateNameInput.value;
    const currentRank = currentRankInput.value;
    const activityPoints = parseInt(activityPointsInput.value);
    const performancePoints = parseInt(performancePointsInput.value);
    const specialPoints = parseInt(specialPointsInput.value);

    // Define promotion-related data (starting points, weights, required points).
    const startingPoints = {
        'Junior Staff': 100,
        'Staff': 200,
        'Senior Staff': 400,
        'Moderator': 800,
        'Administrator': 1600
    };

    const weightActivityPoints = {
        'Junior Staff': 1,
        'Staff': 1,
        'Senior Staff': 1,
        'Moderator': 1,
        'Administrator': 1
    };

    const weightPerformancePoints = {
        'Junior Staff': 1,
        'Staff': 1,
        'Senior Staff': 1,
        'Moderator': 1,
        'Administrator': 1
    };

    const requiredPointsForNextRank = {
        'Junior Staff': 200,
        'Staff': 400,
        'Senior Staff': 800,
        'Moderator': 1600,
        'Administrator': 3200
    };

    // Calculate the total points based on the input.
    const totalPoints = startingPoints[currentRank] +
        (activityPoints * weightActivityPoints[currentRank]) +
        (performancePoints * weightPerformancePoints[currentRank]) +
        specialPoints;

    // Initialize the promotion status message.
    let promotionStatus = '';

    // Check if the candidate qualifies for promotion.
    if (totalPoints >= requiredPointsForNextRank[currentRank]) {
        // Determine the next rank.
        const nextRank = getNextRank(currentRank);
        // Generate a promotion message.
        promotionStatus = `Congratulations, ${candidateName}! You have been promoted to the rank of ${nextRank}. This is a significant achievement, and we appreciate your dedication and hard work. Your contributions have not gone unnoticed, and we believe you'll continue to excel in your new role.`;
    } else {
        // Generate a message indicating that promotion criteria were not met.
        promotionStatus = `Sorry, ${candidateName}. Based on your current performance and contributions, you do not meet the criteria for promotion at this time. However, this should not discourage you. We encourage you to keep working hard, improving your skills, and seeking opportunities to contribute positively to our organization. With continued effort, you can achieve your goal of promotion in the future.`;
    }

    // Create a text file with the promotion status and provide it to the user.
    createPromotionTextFile(candidateName, promotionStatus);

    // Display the promotion status on the webpage.
    resultElement.textContent = promotionStatus;
}

// Function to determine the next rank in the hierarchy.
function getNextRank(currentRank) {
    const ranks = ['Junior Staff', 'Staff', 'Senior Staff', 'Moderator', 'Administrator'];
    const currentIndex = ranks.indexOf(currentRank);
    return currentIndex === -1 ? null : ranks[currentIndex + 1];
}

// Function to create a text file with the promotion status and trigger a download.
function createPromotionTextFile(candidateName, message) {
    const fileName = `${candidateName}_Promotion_Status.txt`;
    const fileContent = `Dear ${candidateName},\n\n${message}`;

    // Create a Blob containing the file content.
    const blob = new Blob([fileContent], { type: 'text/plain' });

    // Create a download link and trigger a click event to download the file.
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}
