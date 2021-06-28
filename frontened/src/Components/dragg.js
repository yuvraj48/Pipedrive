import React from 'react';
import Board from './Board';
import Card from './card';

function dragg(){
    return(
        <div className="card-group  " >
            <div className="flexbox ">
            <Board id="board-1" className="board  ">
                <h5 className="border border-left-0 border-right-0 p-2">Qualified</h5>
                <Card id="card-1" className="card" draggable="true">
                    <p>card one</p>
                </Card>
            </Board>
            <Board id="board-2" className="board ">
            <h5 className="border p-2  border-left-0 border-right-0 ">Contact Made</h5>

            </Board>
            <Board id="board-3" className="board ">
            <h5 className="border p-2  border-left-0 border-right-0 ">Meeting Arranged</h5>

            </Board>

            <Board id="board-4" className="board ">
            <h5 className="border p-2  border-left-0 border-right-0">Needs defined</h5>

             </Board>
             <Board id="board-5" className="board ">
             <h5 className="border p-2  border-left-0 border-right-0">Proposal Made</h5>

             </Board>

             <Board id="board-6" className="board">
             <h5 className="border p-2  border-left-0 border-right-0">Negotiation Started</h5>

             </Board>
            
            
            

           
            </div>
            </div>
        
    )
}
export default dragg;