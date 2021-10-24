class Meal{
    constructor(name, side){
        this.name = name;
        this.side = side;
    }

    describe() {
        return `${this.name} comes with ${this.side}.`;
    }
}

class Restaurant {
    constructor(name) {
        this.name = name;
        this.side = [];
    }

    addMeal(meal) {
        if (meal instanceof Meal) {
            this.meals.push(meal);
        } else {
            throw new Error(`You can only add an instance of Meal. Argument is not a meal: ${meal}`);
        }
    }

    describe() {
        return `${this.name} comes with ${this.meals.length} meals.`;
    }
}

class Menu {
    constructor() {
        this.restaurants = [];
        this.selectedRestaurant = null;
    }

    start() {
        let selection = this.showMainMenuOptions(); 
        
        while (selection != 0) {
            switch(selection){
                case '1':
                    this.createRestaurant(); 
                    break;
                case '2':
                    this.viewRestaurant();
                    break;
                case '3':
                    this.deleteRestaurant();
                    break;
                case '4':
                    this.displayRestaurants();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Thanks for playing!'); 
    }

    showMainMenuOptions() { 
        return prompt(`
         0) Exit Game
         1) Create a new Restaurant
         2) View Restaurant
         3) Delete Restaurant
         4) Display all Restaurants
        `); 
    }

    showRestaurantMenuOptions(restaurantInfo){
        return prompt(`
         0) Go Back
         1) Create Meal
         2) Delete Meal
         ------------------------
         ${restaurantInfo}
         `);
    }

    displayRestaurants() {
        let restaurantString = '';
        for (let i = 0; i < this.restaurants.length; i++) { 
            restaurantString += i + ') ' + this.restaurants[i].name + '\n';  
        }
        alert(restaurantString); 
    }

    deleteRestaurant() {
        let index = prompt('Enter the index of the Restuarant you want to remove:');
        if (index > -1 && index < this.restaurants.length) {
            this.restaurants.splice(index, 1);
        }
    }

    createRestaurant() { 
        let name = prompt('Name your new Restaurant:')
        this.restaurants.push(new Restaurant(name));
    }

    viewRestaurant() {
        let index = prompt('Enter the index of the restaurant you want to view:'); 
        if (index > -1 && index < this.restaurants.length) {
            this.selectedRestaurant = this.restaurants[index];
            let description = 'Restaurant Name: ' + this.selectedRestaurant.name + '\n';  
            
            for (let i = 0; i < this.selectedRestaurant.meals.length; i++) { 
                description += i + ') ' + this.selectedRestaurant.meals[i].name 
                 + ' - ' + this.selectedRestaurant.meals[i].side + '\n'; 
            }

            let selection = this.showRestaurantMenuOptions(description); 
            switch (selection) {
                case '1':
                    this.createMeal();
                    break;
                case '2':
                    this.deleteMeal();
            }


        }
    }

    createMeal() {
        let name = prompt('What entree do you want added to your meal?');
        let side = prompt('What side do you want to add to your meal?');
        this.selectedRestaurant.meals.push(new Meal(name, side));
    }

    deleteMeal() {
        let index = prompt('Enter the index of the meal you want to delete:');
        if (index > -1 && index < this.selectedRestaurant.meals.length) {
            this.selectedRestaurant.meals.splice(index, 1);
        }
    }
}

let menu = new Menu ();  
menu.start();