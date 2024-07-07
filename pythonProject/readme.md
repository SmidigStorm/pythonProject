# Auto-Battler Game

Welcome to the Auto-Battler Game! This project is a simple auto-battler game built with Flask and Python, where monsters battle each other automatically based on their stats and abilities.

## Table of Contents

- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Backlog](#backlog)
- [Contributing](#contributing)
- [License](#license)

## Setup

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/auto-battler-game.git
   cd auto-battler-game

2. **Create a virtual environment:** 

   ```bash
   python -m venv venv

3. **Activate the virtual environment:** 
    ```bash
    venv\Scripts\activate

4. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
   
5. **Set up the database:**

    ```bash
    python
   
6. **Shell**

    Inside the Python shell, run

    ```bash
    python 
    from app import db
    db.create_all()
    exit()
    
6. **Run the application:** 

    ````bash
    python app.py
   
Your Flask application should now be running on http://127.0.0.1:5000.

Running the Application
To run the application, execute the following command:

**Backlog:**

Here are the next development steps planned for the project:

1. Create a set of 3 starter monsters.
2. Create a level system of 10 levels.
3. Make it possible to pick from the 3 starter monsters when starting a "run"Allow players to choose one of the three starter monsters at the beginning of each run.
4. Implement active abilities.
5. Implement active abilities cooldown bar.
6. Implement some status effects.

We welcome contributions to the project! If you would like to contribute, please fork the repository and create a pull request with your changes. Make sure to follow the project's coding standards and include relevant tests.

License
This project is licensed under the MIT License. See the LICENSE file for more details.