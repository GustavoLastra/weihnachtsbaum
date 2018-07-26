import React, { Component } from 'react';
import LedList from "./LedList.js"
import Tools from "./Tools.js"
import InitialLedList from "../data.js"

class Tree extends Component {
    constructor() {
        super();
        this.state = {
            ledList: InitialLedList,
            numberOfLevels: 6,
        };
        //this.addLedRow = this.addLedRow.bind(this);
        this.onTurn = this.onTurn.bind(this);
        this.recursiveTurn = this.recursiveTurn.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.recursiveCreate = this.recursiveCreate.bind(this);
    }

    recursiveTurn(actuallevel,levels, turn, tempArray) {
        console.log("recursiveTurn seed: " + actuallevel)
        console.log("recursiveTurn tempArray: " + JSON.stringify(tempArray))

        // TERMINATION
        if (actuallevel === levels) return;

        // BASE
        if (actuallevel < levels) {
            tempArray.map(object => {
                object.buttonState= turn;
                console.log("object.buttonState: " + object.buttonState)

                // RECURSION
                actuallevel++;
                return this.recursiveTurn(actuallevel,levels, turn, object.ledList);
            })
        }



    }

    onTurn(turn) {
        let tempArray = this.state.ledList;
        let levels = this.state.numberOfLevels;
        let actuallevel = 0;

        if (turn === true){
            this.recursiveTurn(actuallevel,levels, true, tempArray )
        }
        else{
            this.recursiveTurn(actuallevel,levels, false, tempArray)
        }
        this.setState({ledList: tempArray})
    }

    recursiveCreate(levels, actualLevel, newLed) {
        console.log("actualLevel " + actualLevel);
        //Termination
        if (actualLevel === levels) return;

        var led = {
            label: "div",
            buttonState: false,
            ledList: []
        };

        if (actualLevel === 0) {

            actualLevel++;
            newLed.push(led);
            return (this.recursiveCreate(levels, actualLevel, newLed[0].ledList));
        } else if(actualLevel < levels){
            actualLevel++;
            newLed.push(led);
            newLed.push(led);
            return (this.recursiveCreate(levels, actualLevel, newLed[0].ledList));
            return (this.recursiveCreate(levels, actualLevel, newLed[1].ledList));
        }

    }



    onCreate(levels) {

        let newTree = [];
        let actualLevel = 0;
        this.setState({numberOfLevels: levels});
        this.recursiveCreate(levels, actualLevel, newTree);
        console.log("newTree" + JSON.stringify(newTree));
        this.setState({ledList: newTree})
    }


    render() {
        return (
            <div style={styles.container}>
                <div style={styles.toolsContainer}>
                    <Tools
                        onTurn={this.onTurn}
                        onCreate={this.onCreate}
                    />
                </div>

                <div style={styles.treeContainer} >
                        <LedList
                            ledList={this.state.ledList}
                        />

                </div>
            </div>





        );
    }
}

const styles = {

    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-arround",
        width:"90%",
        margin: "auto"
    },

    toolsContainer: {
        display: "flex",
        flexFlow: "row wrap",
        width: "100%",
        margin: "auto",
        backgroundColor: "#ffcc66",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
        marginTop: "5%"
    },

    treeContainer: {
        flexDirection: "column",
        backgroundColor: "#228b22",
        width: "100%",
        margin: "auto",
        display: "flex",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
        marginTop: "2%"

    },



}

export default Tree;