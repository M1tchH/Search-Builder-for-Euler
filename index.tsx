import ToolTitle from "../../Components/layout/ToolTitle";
import RegexInput from "../../Components/inputs/RegexInput";
import RunButton from "../../Components/buttons/RunButton";
import Label from "../../Components/layout/Label";
import Input from "../../Components/inputs/Input";
import SlimButton from "../../Components/buttons/SlimButton";
import styled from "styled-components";
import Button from "../../Components/buttons/Button";
import Panel from "../../Components/layout/Panel";
import React from "react";

const SearchBuilder = () => {
   
    class binaryTree{

        
        private top!: node;
        

        constructor(){
            
        }

        addNode(dat: string, loc: string){
            if(loc.length === 0)
                this.top = new node(dat, "");

        }

        getNode(loc: string):string{
            return this.top.get(loc);
        }

        display(){
            this.top.display();
        }
        
       
    }
    
    class node{

       
        private data: string;
        private loc: string;

        private left!: node;
        private right!: node;
        private lHas: boolean = false;
        private rHas: boolean = false;

        constructor(str:string, loc: string){
            this.data = str;
            this.loc = loc;
        }

        add(dat:string, loc: string){
            if(loc.length === 1){
                if(loc === "l"){
                    this.left = new node(dat,this.loc+"l");
                }
                if(loc === "r"){
                    this.right = new node(dat,this.loc+"r");
                }
                return;
            }

            if(loc.charAt(0) === 'l'){
                this.left.add(dat, loc.substring(1,loc.length));
                return;
            }
            if(loc.charAt(0) === 'r'){
                this.right.add(dat, loc.substring(1,loc.length));
                return;
            }

        }

        get(loc:string) : string{
            if(loc.length === 0){
                return this.data;
            }
            
            if(loc.charAt(0) === 'l'){
                return this.left.get(loc.substring(1,loc.length));
            }
            if(loc.charAt(0) === 'r'){
                return this.right.get(loc.substring(1,loc.length));
            }

            return "";
        }

        display(){
            switch(this.data.charAt(0)){
                //logic cards
                case 'o': //or
                    return this.logicCard("or");
                break;
                case 'r': //nor
                    return this.logicCard("nor");
                break;
                case 'x': //xor
                    return this.logicCard("xor");
                break;
                case 'a': //and
                    return this.logicCard("and");
                break;
                case 'n': //nand
                    return this.logicCard("nand");
                break;

                //attribute cards
                case 't': //tag
                    this.attributeCard("tag");
                break;
                case 'c': //collection
                    this.attributeCard("collection");
                break;
                case 's': //source
                    this.attributeCard("source");
                break;
                case 'm': //name
                    this.attributeCard("name");
                break;
            }
        }

        private logicCard(str: string){
            if(this.lHas && this.rHas){
                return (
                <>
                {this.left.display}
                {str}
                {this.right.display}
                </>
                );
            }
            if( this.rHas){
                return (
                    <>
                    {/* box that can be dragged to */}
                    {str}
                    {this.right.display}
                    </>
                    );
            }
            if(this.lHas){
                return (
                    <>
                    {this.left.display}
                    {str}
                    {/* box that can be dragged to */}
                    </>
                    );
            }
            return (
                <>
                {/* box that can be dragged to */}
                {str}
                {/* box that can be dragged to */}
                </>
                );
        }

        private attributeCard(str: string){
            if(str === "name" || str === "tag"){
                return (
                    <>
                    {str}
                    {/* not button */}
                    {/* text field */}
                    </>
                );
            }
            return (
                <>
                {str}
                {/* not button */}
                {/* /** button */}
                {/* text field */}
                </>
            );
        }
    }

    const [dragOver, setDragOver] = React.useState(false);
    const handleDragOverStart = () => setDragOver(true);
    const handleDragOverEnd = () => setDragOver(false);

    const [elementArr, setElementArr] = React.useState([[1,2],[3,4],[4,5]]);
    const tree = new binaryTree();

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id);
    }

    const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
       setDragOver(false);
        const id = event.dataTransfer.getData('text');
        console.log(`Somebody dropped an element with id: ${id}`);
    }


    function buildElement(){
        var argc = elementArr.length;
        if (argc == 0)
            return;

        return helper(argc);
    }

    function helper(argc: number){
        if(argc === 0)
            return <></>;

        return <OutputBox>  
            {elementArr[elementArr.length-argc][0]} 
            {helper(argc - 1) } 
            {elementArr[elementArr.length-argc][1]} 
        </OutputBox>;
    }


    return (
        <>
            <ToolTitle>Search Builder</ToolTitle>
            <Panel>
                <Label text={"Output"} />
               
            </Panel>
            
            

            <div>
                <OutputBox id="d1" draggable="true" onDragStart={handleDragStart}>Drag me</OutputBox>
                <div id="d2" draggable="true" onDragStart={handleDragStart}>... Or me!</div>
                <div
                    onDragOver={enableDropping}
                    onDrop={handleDrop}
                    onDragEnter={handleDragOverStart}
                    onDragLeave={handleDragOverEnd}
                    style={dragOver ? { fontWeight: 'bold', background: 'red' } : {}}
                >
                    Drop Zone
                </div>
            </div>
        </>
    );
}


export default SearchBuilder;

const OutputBox = styled.div`
display: inline-grid;
grid-template-columns: auto 1fr;
grid-auto-column: auto;
grid-auto-flow: column;
gap: 0.25rem;
flex: 1 1 auto;
background: #222;
padding: 0.125rem 0.125rem;
border: 1px solid #666;
border-radius: 0.25rem;
font-family: monospace;
cursor: pointer;
&:focus-within {
  border-color: #999;
}
&.invalid {
  border-color: #c66;
}
&.disabled {
  border-color: #666 !important;
  background-color: #333 !important;
  color: #aaa !important;
  cursor: initial !important;
}
&:focus-within.invalid {
  border-color: #f99;
}
`;