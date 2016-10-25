// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // initial location
    this.x = 0;
    this.y = 62;

    // Path/location reset range
    this.RangeX = [-170];
    this.RangeY = [62, 142, 226];

    // Speed reset range
    this.RangeSpeed = [100, 200, 300]; //this.getSpeed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // set boundaries for collisions
    this.width = 40;
    this.height = 40;

    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Reset enemy once path complete
    if (this.x >= 505) {
        this.reset();
    }
};

// Reset enemy with new path and new speed
Enemy.prototype.reset = function() {
    this.x = this.RangeX[0];
    this.y = this.getRoad();
    this.speed = this.getSpeed();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Generate path for enemy once path complete
Enemy.prototype.getRoad = function() {
    return this.RangeY[Math.floor(Math.random() * this.RangeY.length)];
};

// Generate new speed for enemy when path resets
Enemy.prototype.getSpeed = function() {
    return this.RangeSpeed[Math.floor(Math.random() * this.RangeSpeed.length)];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var startPlayerX = 200;
var startPlayerY = 407;

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = startPlayerX;
    this.y = startPlayerY;

    // set boundaries for collisions
    this.width = 40;
    this.height = 40;
};

// Update the players's position, required method for game
Player.prototype.update = function(dt) {
    if (this.y < 0) {
        this.reset();
    }

    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < this.x + this.width &&
            allEnemies[i].x + allEnemies[i].width > this.x &&
            allEnemies[i].y < this.y + this.height &&
            allEnemies[i].height + allEnemies[i].y > this.y) {
            this.reset();
        }
    }
};

// Reset player to starting position
Player.prototype.reset = function() {
    this.x = startPlayerX;
    this.y = startPlayerY;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player movement on keystroke
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x >= 0) {
        this.x -= 101;
    }
    if (key === 'up' && this.y >= 0) {
        this.y -= 84;
    }
    if (key === 'down' && this.y <= 400) {
        this.y += 84;
    }
    if (key === 'right' && this.x <= 400) {
        this.x += 101;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
