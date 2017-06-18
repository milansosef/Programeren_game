class Util {
    public static checkCollision(part:Part, character:Character):boolean {

        // log character
        // console.log("character x = "+character.x+", character width = " + character.width);

        // log part
        // console.log("part x = "+part.x+", width = "+ part.width);
        
        return (part.x < character.x + character.width &&
                part.x + part.width > character.x &&
                part.y < character.y + character.height&&
                part.height + part.y > character.y +40)
    }
}
