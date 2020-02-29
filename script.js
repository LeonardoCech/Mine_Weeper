// Definindo as proporções.
var qntPosiY = 10;
var qntPosiX = 10;
var numBombs = 10;

var qntBomb  = numBombs;
var qntFlag  = 0;
var numClick = 0;

document.getElementById("main_bttn").style.backgroundImage = "url(sources/textures/smile.png)";
document.getElementById("main_bttn").style.backgroundSize = "100%";

setInterval(updateBombs, 100);

function updateBombs() { 
    totalBombs = numBombs - qntFlag;
    document.getElementById("bombs_amount").innerHTML = totalBombs; 
}

var field = [];
field.length = qntPosiY;

var defautPosi = new Array;

for ( var iy = 0 ; iy < qntPosiY ; iy++ ) {
    
    field[iy] = [];
    field[iy].length = qntPosiX;
}

for ( var i = 0 ; i < ( qntPosiY * qntPosiX); i++ ) {

    var bombs = false;

    if ( qntBomb > 0) { bombs = true; qntBomb--; }

    defautPosi[i] = { state: true, bomb: bombs, value: 0, flag: false, posi: "" }
}

function shuffle(array) {
    
    var m = array.length, t, i;

    while (m) {
    i = Math.floor(Math.random() * m--);      
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    }
    return array;
}

defautPosi = shuffle(defautPosi);

var pZ = 0;

// Este for é para criar as divs
for ( var pY = 0; pY < qntPosiY; pY++ ) {

    var strPY = pY.toString();

    for ( var pX = 0; pX < qntPosiX; pX++ ) {

        var strPX = pX.toString();

        div = document.createElement('button');
        
        div.setAttribute("id", "a-" + strPY + "-" + strPX);
        div.setAttribute("class", "position");
        div.setAttribute("onmouseover", "onHover(this.id)");
        div.setAttribute("onmouseout", "outHover(this.id)");
        div.setAttribute("onmouseup", "signaling(this.id)");
        div.setAttribute("onclick", "onClick(this.id)");

        if ( qntPosiY >= qntPosiX ) {
            WpY = 550 / qntPosiX;
            WpX = 550 / qntPosiX;
        }

        else { 
            WpY = 550 / qntPosiX;
            WpX = 550 / qntPosiX;
        }

        strWpY = WpY.toString();
        strWpX = WpX.toString();

        div.style.width  = strWpX + "px";
        div.style.height = strWpY + "px";

        div.style.backgroundImage = "url(sources/textures/button.png)";
        div.style.backgroundSize = "100%";
        document.getElementById("field").appendChild(div);

        field[pY][pX] = defautPosi[pZ];

        pZ++;
    }
}

var lastPosiY = qntPosiY - 1 
var lastPosiX = qntPosiX - 1 ;

for ( var a = 0 ; a < qntPosiY ; a++ ) {

    for ( var b = 0 ; b < qntPosiX ; b++ ) {

        var checkBomb = field[a][b].bomb;

        if ( checkBomb == true ) {

            if ( a === 0 ) {  

                if ( b === 0 ) {
                    
                    if ( field[a][b + 1].bomb == false ) { field[a][b + 1].value += 1; }
                    if ( field[a + 1][b].bomb == false ) { field[a + 1][b].value += 1; }
                    if ( field[a + 1][b + 1].bomb == false ) { field[a + 1][b + 1].value += 1; }
                }

                if ( b === lastPosiX ) {

                    if ( field[a][b - 1].bomb == false ) { field[a][b - 1].value += 1; }
                    if ( field[a + 1][b].bomb == false ) { field[a + 1][b].value += 1; }
                    if ( field[a + 1][b - 1].bomb == false ) { field[a + 1][b - 1].value += 1; }
                } 

                else if ( b > 0 && b < lastPosiX ) {

                    if ( field[a][b - 1].bomb == false ) { field[a][b - 1].value += 1; }
                    if ( field[a][b + 1].bomb == false ) { field[a][b + 1].value += 1; }
                    if ( field[a + 1][b].bomb == false ) { field[a + 1][b].value += 1; }
                    if ( field[a + 1][b - 1].bomb == false ) { field[a + 1][b - 1].value += 1; }
                    if ( field[a + 1][b + 1].bomb == false ) { field[a + 1][b + 1].value += 1; }
                }
            }

            if ( a === lastPosiY ) {  

                if ( b === 0 ) {
                    
                    if ( field[a][b + 1].bomb == false ) { field[a][b + 1].value += 1; }
                    if ( field[a - 1][b].bomb == false ) { field[a - 1][b].value += 1; }
                    if ( field[a - 1][b + 1].bomb == false ) { field[a - 1][b + 1].value += 1; }
                }

                if ( b === lastPosiX ) {

                    if ( field[a][b - 1].bomb == false ) { field[a][b - 1].value += 1; }
                    if ( field[a - 1][b].bomb == false ) { field[a - 1][b].value += 1; }
                    if ( field[a - 1][b - 1].bomb == false ) { field[a - 1][b - 1].value += 1; }
                } 

                else if ( b > 0 && b < lastPosiX ) {

                    if ( field[a][b - 1].bomb == false ) { field[a][b - 1].value += 1; }
                    if ( field[a][b + 1].bomb == false ) { field[a][b + 1].value += 1; }
                    if ( field[a - 1][b].bomb == false ) { field[a - 1][b].value += 1; }
                    if ( field[a - 1][b - 1].bomb == false ) { field[a - 1][b - 1].value += 1; }
                    if ( field[a - 1][b + 1].bomb == false ) { field[a - 1][b + 1].value += 1; }
                }
            }
            if ( b === 0 && a > 0 && a < lastPosiY ) {

                if ( field[a][b + 1].bomb == false ) { field[a][b + 1].value += 1; }
                if ( field[a - 1][b].bomb == false ) { field[a - 1][b].value += 1; }
                if ( field[a + 1][b].bomb == false ) { field[a + 1][b].value += 1; }
                if ( field[a + 1][b + 1].bomb == false ) { field[a + 1][b + 1].value += 1; }
                if ( field[a - 1][b + 1].bomb == false ) { field[a - 1][b + 1].value += 1; }
            }

            if ( b === lastPosiX && a > 0 && a < lastPosiY ) {  

                if ( field[a][b - 1].bomb == false ) { field[a][b - 1].value += 1; }
                if ( field[a - 1][b].bomb == false ) { field[a - 1][b].value += 1; }
                if ( field[a + 1][b].bomb == false ) { field[a + 1][b].value += 1; }
                if ( field[a - 1][b - 1].bomb == false ) { field[a - 1][b - 1].value += 1; }
                if ( field[a + 1][b - 1].bomb == false ) { field[a + 1][b - 1].value += 1; }
            }

            else if ( a > 0 && a < lastPosiY && b > 0 && b < lastPosiX) {

                if ( field[a - 1][b].bomb == false ) { field[a - 1][b].value += 1; }
                if ( field[a + 1][b].bomb == false ) { field[a + 1][b].value += 1; }

                if ( field[a][b - 1].bomb == false ) { field[a][b - 1].value += 1; }
                if ( field[a][b + 1].bomb == false ) { field[a][b + 1].value += 1; }
                
                if ( field[a - 1][b - 1].bomb == false ) { field[a - 1][b - 1].value += 1; }
                if ( field[a - 1][b + 1].bomb == false ) { field[a - 1][b + 1].value += 1; }
                if ( field[a + 1][b + 1].bomb == false ) { field[a + 1][b + 1].value += 1; }
                if ( field[a + 1][b - 1].bomb == false ) { field[a + 1][b - 1].value += 1; }
            }
        }
    }
}

function openChangelog()  { document.getElementById("changelog_page").style.display = "block";}

function closeChangelog() { document.getElementById("changelog_page").style.display = "none";}

function Restart() { parent.window.document.location.href = ''; }

function Death() { 
    
    pauseCont++;

    document.getElementById("main_bttn").style.backgroundImage = "url(sources/textures/dead.png)";

    for ( var a = 0 ; a < qntPosiY ; a++ ) {

        for ( var b = 0 ; b < qntPosiX ; b++ ) {

            var strId1 = a.toString();
            var strId2 = b.toString();

            document.getElementById("a-" + strId1 + "-" + strId2).disabled = "true";

            if ( field[a][b].bomb == true ){

                document.getElementById("a-" + strId1 + "-" + strId2).style.backgroundImage = "url(sources/textures/bomb.gif)";
                field[a][b].state = false; 
            } 
        }
    }
}

if ( numClick > 0 ) { pauseCont++; }

var pauseCont = 0;

setInterval(pauseGame, 1000);

function pauseGame() {

    if ( (pauseCont%2) !== 0 ) { chronometer(); }
}

var seconds = 0;

function chronometer() {

    seconds++;

    document.getElementById('seconds').innerHTML = seconds;
}

function onHover(id) {

    var clickId = id.split("-");
    var id1 = parseInt(clickId[1]);
    var id2 = parseInt(clickId[2]);

    var flag = field[id1][id2].flag;

    var onHover = document.getElementById(id);

    if ( flag === false ) {
        onHover.style.backgroundImage = "url(sources/textures/hover.png)";
    }
    else { 
        onHover.style.backgroundImage = "url(sources/textures/flag.png)";
    }
}	

function outHover(id) {

    var clickId = id.split("-");
    var id1 = parseInt(clickId[1]);
    var id2 = parseInt(clickId[2]);

    var flag = field[id1][id2].flag;

    var outHover = document.getElementById(id);

    if ( flag === false ) {
        outHover.style.backgroundImage = "url(sources/textures/button.png)";
    }
    else { 
        outHover.style.backgroundImage = "url(sources/textures/flag.png)";
    }
}

function signaling(id) {

    var clickId = id.split("-");
    var id1 = parseInt(clickId[1]);
    var id2 = parseInt(clickId[2]);

    var flag = field[id1][id2].flag;

    if ( event.button === 2 && flag === false &&
            qntFlag < numBombs || 
            event.button === 3 && flag === false &&
            qntFlag < numBombs ) {
    
        field[id1][id2].flag = true;

        qntFlag++;
    }
    else if ( event.button === 2 && flag === true || 
                event.button === 3 && flag === true ) { 
        qntFlag--;
        field[id1][id2].flag = false;
    }
}

setInterval(Compare, 500);

function Compare() {

    if ( totalBombs == 0 ) {
        pauseCont = 0;
        document.getElementById("main_bttn").style.backgroundImage = "url(sources/textures/winner.png)";
    }
}

function pressTrues(id) { // If exist some button with value > 0 around the empty clicked button, this function make shows.

    var clickId = id.split("-");
    var id1 = parseInt(clickId[1]);
    var id2 = parseInt(clickId[2]);
    
    var AroundPo = new Array;

    for ( var a = id2 ; a >= 0 ; a-- ) { 
        
        FIELD = field[id1][a];

        bomb  = FIELD.bomb;
        value = FIELD.value;
        state = FIELD.state;
        flag  = FIELD.flag;

        idFinal = "a-" + id1.toString() + "-" + a.toString();

        if ( flag == true ) { FIELD.flag = false; qntFlag--; }

        if (value > 0) { onClick(idFinal); a = 0; }

        else if ( bomb == false && value === 0) {

            //	
            // ))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))	
            // ))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
            //

            for ( var Aa = id1; Aa >= 0 ; Aa-- ) {
                
                FIELD = field[Aa][a];

                bomb  = FIELD.bomb;
                value = FIELD.value;
                state = FIELD.state;
                flag  = FIELD.flag;

                idFinal = "a-" + Aa.toString() + "-" + a.toString();
                
                if ( flag == true ) { FIELD.flag = false; qntFlag--; }

                if (value > 0) { onClick(idFinal); Aa = 0; }

                else if ( bomb == false ) {

                    document.getElementById(idFinal).style.backgroundImage = "url(sources/textures/pressed.png)";
                    document.getElementById(idFinal).disabled = "true";
                    FIELD.state = false;


                    var Around = new Array(8);

                    Around[0] = (Aa > 0) && (a > 0) ? field[Aa - 1][a - 1].posi = (Aa - 1).toString() +"-"+ (a - 1).toString() : "";

                    Around[1] = Aa > 0 ? field[Aa - 1][a].posi = (Aa - 1).toString() +"-"+ a.toString() : "";

                    Around[2] = (a < lastPosiX) && (Aa > 0)? field[Aa - 1][a + 1].posi = (Aa - 1).toString() +"-"+ (a + 1).toString() : "";

                    Around[3] = a < lastPosiX ? field[Aa][a + 1].posi = Aa.toString() +"-"+ (a + 1).toString() : "";

                    Around[4] = (Aa < lastPosiY) && (a < lastPosiX) ? field[Aa + 1][a + 1].posi = (Aa + 1).toString() +"-"+ (a + 1).toString() : "";

                    Around[5] = Aa < lastPosiY ? field[Aa + 1][a].posi = (Aa +  1).toString() +"-"+ a.toString() : "";

                    Around[6] = (Aa < lastPosiY) && (a > 0) ? field[Aa + 1][a - 1].posi = (Aa + 1).toString() +"-"+ (a - 1).toString() : "";

                    Around[7] = a > 0 ? field[Aa][a - 1].posi = Aa.toString() +"-"+ (a - 1).toString() : "";

                    if (Around[0] != "") {

                        var position = Around[0].split("-");
                        var id1 = parseInt(position[0]);
                        var id2 = parseInt(position[1]);

                        state = field[id1][id2].state;
                        value = field[id1][id2].value;
                        bomb  = field[id1][id2].bomb;
                        flag  = field[id1][id2].flag;

                        idFinal = "a-" + id1 + "-" + id2;

                        if ( flag == true ) { field[id1][id2].flag = false; qntFlag--; }

                        if( bomb == false && value > 0) { AroundPo.push(idFinal); }
                    }

                    if (Around[1] != "") {

                        var position = Around[1].split("-");
                        var id1 = parseInt(position[0]);
                        var id2 = parseInt(position[1]);

                        state = field[id1][id2].state;
                        value = field[id1][id2].value;
                        bomb  = field[id1][id2].bomb;
                        flag  = field[id1][id2].flag;

                        idFinal = "a-" + id1 + "-" + id2;

                        if ( flag == true ) { field[id1][id2].flag = false; qntFlag--; }

                        if( bomb == false && state == true) { AroundPo.push(idFinal); }
                    }			

                    if (Around[2] != "") {

                        var position = Around[2].split("-");
                        var id1 = parseInt(position[0]);
                        var id2 = parseInt(position[1]);

                        state = field[id1][id2].state;
                        value = field[id1][id2].value;
                        bomb  = field[id1][id2].bomb;
                        flag  = field[id1][id2].flag;

                        idFinal = "a-" + id1 + "-" + id2;

                        if ( flag == true ) { field[id1][id2].flag = false; qntFlag--; }

                        if( bomb == false && state == true) { AroundPo.push(idFinal); }
                    }
                                

                    if (Around[3] != "") {

                        var position = Around[3].split("-");
                        var id1 = parseInt(position[0]);
                        var id2 = parseInt(position[1]);

                        state = field[id1][id2].state;
                        value = field[id1][id2].value;
                        bomb  = field[id1][id2].bomb;
                        flag  = field[id1][id2].flag;

                        idFinal = "a-" + id1 + "-" + id2;

                        if ( flag == true ) { field[id1][id2].flag = false; qntFlag--; }

                        if( bomb == false && state == true ) { AroundPo.push(idFinal); }
                    }
                            
                    if (Around[4] != "") {

                        var position = Around[4].split("-");
                        var id1 = parseInt(position[0]);
                        var id2 = parseInt(position[1]);

                        state = field[id1][id2].state;
                        value = field[id1][id2].value;
                        bomb  = field[id1][id2].bomb;
                        flag  = field[id1][id2].flag;

                        idFinal = "a-" + id1 + "-" + id2;

                        if ( flag == true ) { field[id1][id2].flag = false; qntFlag--; }

                        if( bomb == false && state == true ) { AroundPo.push(idFinal); }
                    }

                    if (Around[5] != "") {

                        var position = Around[5].split("-");
                        var id1 = parseInt(position[0]);
                        var id2 = parseInt(position[1]);

                        state = field[id1][id2].state;
                        value = field[id1][id2].value;
                        bomb  = field[id1][id2].bomb;
                        flag  = field[id1][id2].flag;

                        idFinal = "a-" + id1 + "-" + id2;

                        if ( flag == true ) { field[id1][id2].flag = false; qntFlag--; }

                        if( bomb == false && state == true) { AroundPo.push(idFinal); }
                    }

                    if (Around[6] != "") {

                        var position = Around[6].split("-");
                        var id1 = parseInt(position[0]);
                        var id2 = parseInt(position[1]);

                        state = field[id1][id2].state;
                        value = field[id1][id2].value;
                        bomb  = field[id1][id2].bomb;
                        flag  = field[id1][id2].flag;

                        idFinal = "a-" + id1 + "-" + id2;

                        if ( flag == true ) { field[id1][id2].flag = false; qntFlag--; }

                        if( bomb == false && state == true ) { AroundPo.push(idFinal); }
                                
                    }

                    if (Around[7] != "") {

                        var position = Around[7].split("-");
                        var id1 = parseInt(position[0]);
                        var id2 = parseInt(position[1]);

                        state = field[id1][id2].state;
                        value = field[id1][id2].value;
                        bomb  = field[id1][id2].bomb;
                        flag  = field[id1][id2].flag;

                        idFinal = "a-" + id1 + "-" + id2;

                        if ( flag == true ) { field[id1][id2].flag = false; qntFlag--; }

                        if( bomb == false && state == true ) { AroundPo.push(idFinal); }
                                
                    }
                }
            }
        }
    }

    AroundPo = AroundPo.filter(function(This, i) {  return AroundPo.indexOf(This) == i; } ); 

    for ( var i = 0 ; i < AroundPo.length ; i++ ) {

        var clickId = AroundPo[i].split("-");
        var id1 = parseInt(clickId[1]);
        var id2 = parseInt(clickId[2]);

        if ( field[id1][id2].state == true ) { onClick(AroundPo[i]); }
    }	
}

function onClick(id) {

    numClick++;

    if ( numClick == 1 ) {
        pauseCont++;
    }
    var clickId = id.split("-");
    var id1 = parseInt(clickId[1]);
    var id2 = parseInt(clickId[2]);

    var bomb  = field[id1][id2].bomb;
    var flag  = field[id1][id2].flag;
    var value = field[id1][id2].value;

    field[id1][id2].flag = false;

    field[id1][id2].state = false;

    var clicked = document.getElementById(id);
    clicked.style.backgroundColor = "rgba(250,250,250,0.5)";
    clicked.disabled = "true";     

    if ( bomb == true ) {
        Death();
        if ( flag == true ) { qntFlag--; }
        document.getElementById(id).style.backgroundImage = "url(sources/textures/bomb.gif)";
    }

    else {

        switch ( value ) {

            case 0 :
                document.getElementById(id).style.backgroundImage = "url(sources/textures/pressed.png)";
                pressTrues(id);
                break;
            
            case 1 : 
                document.getElementById(id).style.backgroundImage = "url(sources/textures/value1.png)"; 
                break;
            
            case 2 : 
                document.getElementById(id).style.backgroundImage = "url(sources/textures/value2.png)"; 
                break;
            
            case 3 : 
                document.getElementById(id).style.backgroundImage = "url(sources/textures/value3.png)"; 
                break;
            
            case 4 : 
                document.getElementById(id).style.backgroundImage = "url(sources/textures/value4.png)"; 
                break;
            
            case 5 : 
                document.getElementById(id).style.backgroundImage = "url(sources/textures/value5.png)"; 
                break;
            
            case 6 : 
                document.getElementById(id).style.backgroundImage = "url(sources/textures/value6.png)"; 
                break;
            
            case 7 : 
                document.getElementById(id).style.backgroundImage = "url(sources/textures/value7.png)"; 
                break;
            
            case 8 : 
                document.getElementById(id).style.backgroundImage = "url(sources/textures/value8.png)"; 
                break;
        }
    }
}