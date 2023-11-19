const muscleGroupsURL = 'https://restapi-test-01.woit.net/get_all_muscle_groups';

// Function to fetch muscle groups from the API
export const collectAllMuscleGroups = async () => {
  try {
    const response = await fetch(muscleGroupsURL);
    if (!response.ok) {
      throw new Error('Failed to fetch muscle groups');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching muscle groups:', error);
    throw error;
  }
};
