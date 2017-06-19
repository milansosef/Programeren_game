class Util {
    public static checkCollision(part:Part, character:Character):boolean { 
        return (part.x < character.x + character.width &&
                part.x + part.width > character.x &&
                part.y < character.y + character.height&&
                part.height + part.y > character.y +40)
    }
}
