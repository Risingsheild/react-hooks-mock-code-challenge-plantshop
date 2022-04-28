import React,{useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [onSearch, setOnSearch] = useState("")

  useEffect(() => {
    fetch(" http://localhost:6001/plants")
    .then((r) => r.json())
    .then((plantsArray) => setPlants(plantsArray));
  }, []);

  function handleAddPlant(newPlant) {
    const updatedPlantsArray =[...plants, newPlant]
    setPlants(updatedPlantsArray)
  }

  function handleDeletePlant(id) {
    const updatedPlantsArray = plants.filter((plant) => plant.id !== id)
    setPlants(updatedPlantsArray)
  }

  function handleUpdatePlant(updatePlant) {
    const updatedPlantsArray = plants.map((plant) => {
      if (plant.id === updatePlant.id) {
        return updatePlant;
      } else {return plant}
    })
    setPlants(updatedPlantsArray)
  }

  const displayedPlants =plants.filter((plant) => {
    return plant.name.toLowerCase().includes(onSearch.toLocaleLowerCase())
  })

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={onSearch} onChangeSearch={setOnSearch} />
      <PlantList 
        plants={displayedPlants}
        onDeletePlant={handleDeletePlant}
        onUpdatePlant={handleUpdatePlant} />
    </main>
  );
}

export default PlantPage;
