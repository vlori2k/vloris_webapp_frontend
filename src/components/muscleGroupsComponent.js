import React, { useState, useEffect } from 'react';
import { collectAllMuscleGroups } from '../services/muscleGroupsService'; 


const MuscleGroupComponent = () => {
  const [muscles, setMuscles] = useState([]);

  const clearAllMuscleGroups = () => {
    setMuscles([]);
  };

  const getMusclesFromDB = async () => {
    try {
      const data = await collectAllMuscleGroups();
      setMuscles(data);
    } catch (error) {
      console.error('Error fetching muscle groups:', error);
      // Optionally, set an error state to display a message to the user
    }
  };

  useEffect(() => {
    // Fetch muscle groups when the component mounts
    getMusclesFromDB();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div>
      <h1>Muscles</h1>
      <div>
        <button onClick={getMusclesFromDB}>Get Muscles from DB</button>
        <button onClick={clearAllMuscleGroups}>Clear list of muscle groups</button>
      </div>
      <ul>
        {muscles.map(muscle => (
          <li key={muscle.muscle_group_ID}>
            {muscle.muscle_group_ID.toString()} ----- {muscle.muscle_group} ----- <img src={muscle.muscle_group_img}  style={{ maxWidth: '100%', maxHeight: '100px' }} /> -- 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MuscleGroupComponent;
