//--------------Get Object Handles---------
   pc_obj = document.getElementById("pc");
 calc_obj = document.getElementById("calc");
input_obj = document.getElementById("inpt");
output_obj  = document.getElementById("out_buff");
console_obj = document.getElementById("console_id");
run_obj     = document.getElementById("run_id");
halt_obj    = document.getElementById("halt_id");
in_obj      = document.getElementById("in_buff");
out_obj     = document.getElementById("out_buff");
message_obj     = document.getElementById("message_id");
output_disp_obj = document.getElementById("output_disp");

//------------------------------------------------------
//---------------LMC State Machine------------------
//------------------------------------------------------
lmc = new Object
(
{
accumulator:0,//aka "CALC"
program_counter:0,  //aka "Instruction Location Register"
instruction_reg:0,  //Instruction Register
ram:new Array(100), //AKA Mailboxes
in_buff	:0, //Input Buffer
in_flag	:false,//Input Flag
out_buff:0,  //Output Buffer
out_flag:false//Flag Designating New Output Is Present

}
);
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------

//Current Insruction:
curr_timer=0;
//Init Computer
coldStart();
loadState();


//----------------------------------[Button Handlers]---------------------------------------------------

//Cold Boot Clear Ram
function coldStart()
{

output_obj.innerHTML='&nbsp;';
//Init Ram
for(var c=0;c<lmc.ram.length;c++){lmc.ram[c]=0;}
reset();
}


//Soft Boot
function reset()
{
//Clear All highlighting
for(var c=0;c<100;c++)
{
document.getElementById('rr_' + c).parentNode.style.backgroundColor="#FFFFFF";
}
pc_obj.value='0';
calc_obj.value='0';
lmc.program_counter=0;
lmc.accumulator=0;
document.getElementById('rr_' + 0).parentNode.style.backgroundColor="#0000FF";
run_obj.disabled=false;
halt_obj.disabled=true;
clearInterval(curr_timer);
in_obj.value = in_obj.value.replace(/(^[\s]+)/g,'');
output_obj.innerHTML='&nbsp;';
input_obj.value='';
message_obj.innerHTML="";
}

function step()
{
loadState();  //Grab input from page...
clockCycle(); 
showState();
}

function runStep() //Run state ignores the page until execution is complete
{
clockCycle(); 
showState();
}

function handleRun()
{
loadState(); 
run_obj.disabled=true;
halt_obj.disabled=false;
curr_timer = setInterval(step,200);
}

function handleHalt()
{
run_obj.disabled=false;
halt_obj.disabled=true;
clearInterval(curr_timer);
}
//--------------------------------------------------------------------------------------------------------




//--------------------------------------[Util Funcitons]---------------------------------------------



function zeroPadOne(str)
{

n_val = parseInt(str);
if(n_val<0)return str;
if(n_val<10) n_val = '00' + n_val;
else if(n_val<100 && n_val >=10) n_val = '0'  + n_val;
return n_val;
}


//Internal Representation

//Add some syntax highlighting to the memory cells
function printMemCell(num,pc)
{
var b_str='';
if(lmc.program_counter==pc)
{
b_str ='font-weight:bold';
}

if(num==0)
{
return '<font color=#FFFFFF style="'+b_str+'">' +zeroPadOne(num)+ '</font>';
}
else if(num>=100 && num < 1000)
{
return '<font color=#FF0000 style="'+b_str+'">' +zeroPadOne(num)+ '</font>';
}
else
{
return '<font color=#00FF00 style="'+b_str+'">' +zeroPadOne(num)+ '</font>';
}
}

function coreDump()
{
rval = '';
rval += '------------------------[CORE DUMP]------------------------<BR>';
rval += 'Accumulator: <font color=#FFFFFF>'      +  zeroPadOne(lmc.accumulator)+  '</font><BR>';
rval += 'Program Counter: <font color=#FFFFFF>'  +  zeroPadOne(lmc.program_counter) +  '</font><BR>';
rval += 'Last Instruction: <font color=#FFFFFF>' +  zeroPadOne(lmc.instruction_reg) +  '</font><BR>';
rval += 'Last Input: <font color=#FFFFFF>' +  zeroPadOne(lmc.in_buff)	+  '</font><BR>';
rval += 'Last Output: <font color=#FFFFFF>'    +  zeroPadOne(lmc.out_buff)  + '</font><BR>';
rval += '<BR>RAM:<BR>';
rval += '<table class="console" border=0 cellspacing=0 cellpadding=0>';
for(var c=0;c<lmc.ram.length;c+=5)
{
c_str = c+'';
col_str='';
rval += '<tr><td>'+zeroPadOne(c_str);
rval += ':</td>';
rval += '<td>['+printMemCell(lmc.ram[c+0],(c+0))+']</td>';
rval += '<td>['+printMemCell(lmc.ram[c+1],(c+1))+']</td>';
rval += '<td>['+printMemCell(lmc.ram[c+2],(c+2))+']</td>';
rval += '<td>['+printMemCell(lmc.ram[c+3],(c+3))+']</td>';
rval += '<td>['+printMemCell(lmc.ram[c+4],(c+4))+']</td></tr>';
}
rval +='</table>';
rval += '------------------------[END CORE DUMP]--------------------<BR>';
console_obj.innerHTML = rval;
}




//Grabs the next number off the buffer and loads it onto the input pins
//If the buffer is empty, 0 is loaded onto the input pins
function getInputFromBuffer()
{
//Trim White front whitespace
  in_obj.value = in_obj.value.replace(/(^[\s]+)/g,'');
    
    //Tokenize Input
      var split_str = in_obj.value.split(/[,\s]+/g)
	
	//Grab next input off of array
	  if(split_str[0].search(/[0-9]+/g)!=-1)
	    input_obj.value = split_str[0];
	      else
		input_obj.value = '0';
		  
		   //Take the last element off of the input array
		     //Chop first value off of queue
		       var rval='';
			 for(var c=1;c<split_str.length;c++)
			   {
			    rval += split_str[c] + ' ';
			        }
				 in_obj.value = rval;
}

function printOutput()
{
output_disp_obj.value = lmc.out_buff; // Update Output Cell
output_obj.innerHTML += lmc.out_buff +' '; //Update Output Console
}

function loadState()
{

 lmc.accumulator     = parseInt(calc_obj.value);
  lmc.program_counter = parseInt(pc_obj.value);
   for(var c=0;c<lmc.ram.length;c++)
    { 
      var num=0;
       if(document.getElementById('rr_'+c).value==undefined || document.getElementById('rr_'+c).value=='')
	{
	 num=0;
	  }
	   else
	    {
	     num = parseInt(document.getElementById('rr_'+c).value);
	      }
	       lmc.ram[c]=num;
	        }
}

function showState()
{
 calc_obj.value = lmc.accumulator;
  pc_obj.value   = lmc.program_counter;
   for(var c=0;c<lmc.ram.length;c++)
    {
     document.getElementById('rr_'+c).value = lmc.ram[c]+'';
      document.getElementById('rr_'+c).parentNode.style.backgroundColor="#FFFFFF";
       }
        
	 //Highlight instruction counter
	  document.getElementById('rr_' + lmc.program_counter).parentNode.style.backgroundColor="#0000FF"; 
}

//------------------------------------------------------------------------------------------------------
//---------------------------------Fetch Execute Cycle------------------------------------------------
//------------------------------------------------------------------------------------------------------

//This is the "internal" simulator

function clockCycle()
{
//Fetch  
lmc.instruction_reg = lmc.ram[lmc.program_counter];

//Bump (Increment Program Counter)
if(lmc.instruction_reg>=100 && lmc.instruction_reg<=999) //Halt on Data Execution
{
lmc.program_counter = (lmc.program_counter + 1) % 100;
}
else //Crash here if non-instruction loaded.
{
handleHalt();
return 0;
}

//Decode & Execute
var addr=0;
//Load
if(lmc.instruction_reg >= 500 && lmc.instruction_reg<=599)
{
addr = lmc.instruction_reg - 500;
lmc.accumulator = lmc.ram[addr];
}

//Store
else if(lmc.instruction_reg >= 300 && lmc.instruction_reg<=399)
{
addr = lmc.instruction_reg - 300;
lmc.ram[addr] = lmc.accumulator;
}

//add 
else if(lmc.instruction_reg >= 100 && lmc.instruction_reg<=199)
{
addr = lmc.instruction_reg - 100;
if((lmc.accumulator + lmc.ram[addr])>999) {handleHalt(); message_obj.innerHTML="Overflow!"; return 0;}
lmc.accumulator += lmc.ram[addr];
}

//Subtract 
else if(lmc.instruction_reg >= 200 && lmc.instruction_reg<=299)
{
addr = lmc.instruction_reg - 200;
lmc.accumulator -= lmc.ram[addr];
}

//Input
else if(lmc.instruction_reg == 901)
{
 //Load Input obj into calc.
   getInputFromBuffer();
     lmc.in_buff = parseInt(input_obj.value);
     lmc.accumulator = lmc.in_buff;
     }
     
     //Output 
     else if(lmc.instruction_reg == 902)
     {
     lmc.out_buff = lmc.accumulator;
     printOutput();
     }
     
     //Branch if 0 
     else if(lmc.instruction_reg >= 700 && lmc.instruction_reg<=799)
     {
     addr = lmc.instruction_reg - 700;
     if(lmc.accumulator==0)
       {
        lmc.program_counter = addr % 100;
	  }
	  }
	  
	  //Branch if >= 0 
	  else if(lmc.instruction_reg >= 800 && lmc.instruction_reg<=899)
	  {
	  addr = lmc.instruction_reg - 800;
	  if(lmc.accumulator>=0)
	    {
	     lmc.program_counter = addr % 100;
	       }
	       } 
	       
	       //Branch unconditional
	       else if(lmc.instruction_reg >= 600 && lmc.instruction_reg<=699)
	       {
	       addr = lmc.instruction_reg - 600;
	       lmc.program_counter = addr % 100;
	       }
}
//------------------------------------------------------------------------------------------------------


