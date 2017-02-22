/*
Copyright: P1ratRuleZZZ
O��ca��� �y�����:
Ka���y���op - ca��� o������  �a���y���op c 4-�� �y�������:
   <pe�y���a� ����c�e���> = calculator(<�ep�oe ��c�o>,<��opoe ��c�o>,<o�epa�op>,[coo��e��e o� o����e]);
   O�epa�op�:"+","-","*","/";
   �p��ep:
         var result = calculator(2,5,"+"); 
         result == 7
�po�ep�a c�po�� �a ��c�o:
   <��o ��c�o?> = is_dig(<��c�o>,[��o �ec��a��p���oe ��c�o?]);
   Bep�e� "true",ec�� ��o ��c�o,� �po����o� c�y�ae "false".
   �p� �po�ep�e 16p���o�o ��c�a y�a���a��e true �a� ��opo� �apa�e�p
      �p��ep:
         result = is_dig("4AC",true);
         result == true;

�peo�pa�o�a��e � 10p���y� c�c�e�y:
   <pe�y���a�> = ToDec(<��c�o>,<oc�o�a��e pe�y����py��e� c�c�e��>,[coo��e��e o� o����e]);
   �p��ep:
      result = ToDec(10101,2);
      result == 21;
�peo�pa�o�a��e �� 10p���o� c�c�e��:
   <pe�y���a�> = FromDec(<10���oe ��c�o>,<oc�o�a��e pe�y����py��e� c�c�e��>,[�o���o� pe��c�p �y�� 16p���o� c�c�e��?],[oo��e��e o� o����e]);
   �p��ep:
      result = FromDec(10,16,true);
      result == "F";
      
      result = FromDec(214,16);
      result == "d6";

�po�ep�a �a����� ��e�e��a � �acc��e:
   <pe�y���a�(boolean)> = in_array(<��e�e��>,<�acc��>);
   true � c�yae yc�exa
   
   


*/

function gi(txt)
{
	return document.getElementById(txt);
}
function shuffle(arr)
{
var poses=new Array();
var res=new Array();
var pose;
for(i=0;i<=arr.length-1;i++)
{
pose=Math.round(Math.random()*(arr.length-1));
while(in_array(pose,poses))
{
pose=Math.round(Math.random()*(arr.length-1));
}
poses[i]=pose;
res[i]=arr[pose];
}
return res;
}


function rand(min,max)
{
if(!isNaN(max) && !isNaN(min) && max>min)
{
return Math.round(Math.random()*(max-min))+min;
}
else return "Not a number";
}

function calculator(first,second,operator,errMsg)  //�c�o���o�a��e
{   
   if(errMsg == undefined) errMsg="O����a";      //<�epe�e��a�> = calculator(<�ep�oe ��c�o>,<��opoe ��c�o>,<o�epa�op>,<coo��e��e o�����>) ;
   if(first.length==0) first=0;
   if(second.length==0) second=0;
   var result;                              //o�epa�op�:   
   if                                    //"+" - c�o�e��e
   (                                    //"-" - �����a��e
      (!isNaN(first))                        //"*" - y��o�e��e
      &&                                 //"/" - �e�e��e
      (!isNaN(second))                     // �ep�e� pe�y���a� ��� o����y
   ) 
   {//��o� yc�o���
      first = parseFloat(first);//     �peo�pa�ye� o�epa���
      second = parseFloat(second);// � ��c�e���� ���
      switch(operator)
      {//����pae� o�epa�op
         case "+":
            result = first + second;
         break;
         case "-":
            result = first - second;
         break;
         case "*":
            result = first * second;
         break;
         case "/":
            if(second==0) result="�e�e��e �a �o��";
            else result = first/second;
         break;
         default:
            result = "Hecy�ec��y���� o�epa�op"; //�ae� o����y c � c�y�ae o�����
      }
   }
   else result=errMsg;
   
   return result;
   
   
}
function ToDec(dig,from,errMsg)
{
   if(errMsg == undefined) errMsg="O����a";
   dig = String(dig);
   if((is_dig(dig))&&(!isNaN(from)))
   {
      var HexArray = new Array();
      var g = "A".charCodeAt(0);
      for(i=0;i<=5;i++)
      {
         HexArray[i] = String.fromCharCode(g);
         g++;
      }
      g = "a".charCodeAt(0);
      for(i=6;i<=6+5;i++)
      {
         HexArray[i] = String.fromCharCode(g);
         g++;
      }
      var sum = 0;
      var mn = 1;
      var cCode;
      var last;
      var i;
      for(i=dig.length-1;i>=0;i--)
      {
         last=dig.charAt(i);
         if(in_array(last,HexArray))
         {
            cCode = last.charCodeAt(0);
            if(cCode>70) cCode = cCode - 32;
            last = cCode - 65 + 10;
         }
         sum +=  last*mn;
         mn *=from;
      }
      
   }
   else sum=errMsg;
   return sum;
   
   
}
String.prototype.reverse = function()
{
	
	return this.split("").reverse().join("");
}

function is_dig(dig,base)
{
	
	var diap = new String("[0-9.");
	if(base>10) 
	{
		for(var i="A".charCodeAt(0);i<="A".charCodeAt(0)+(base-1-10);i++)
		{
			diap+=String.fromCharCode(i);
		}
	}
	diap+="]";
	
	
	var dig =String(dig).toLocaleUpperCase();
	var re = new RegExp(diap+"{"+(dig.length)+"}","i");
	return (re.exec(dig)==null ? false : true);
}
String.prototype.toFixed = function(prec)
{
	if(prec<1) return parseFloat(this);
	return parseFloat(parseFloat(this).toFixed(prec));
}
//ConvertSys("10.2",10,2,true);

function ConvertSys(dig,sFrom,sTo,hexUp,fix)
{
	var results=new Array(new Array(),new Array());
	if(!is_dig(dig,sFrom) || isNaN(sFrom) || isNaN(sTo) || sFrom<=1 || sTo<=1 || sFrom>34 || sTo>34) return false;
	if(sTo==sFrom) return new Array(dig,results);
	hexUp=hexUp ? 0 : 32;
	var trunc = String("");
	var prPos = String(dig).indexOf(".");
	if(prPos!=-1)
	{
		fix = fix==undefined ? 16 : fix;
		fix = fix<1 ? 16 : fix;
		trunc = String(String(dig).substr(prPos+1));
		var i=0;
		while(String(trunc[i])=="0") i++;
		trunc = String(trunc).substr(i);
		//alert(trunc)
		/*
		//alert(trunc);
		//return;
		trunc = "."+String(ConvertSys(trunc,sFrom,sTo,hexUp,fix)[0]);
		
		//alert(trunc);
		*/
		
		if(sFrom!=10)
		{
			var dec = 0;
			for(var i=0;trunc[i];i++)
			{
				var tmp = trunc[i];
			
				if(isNaN(tmp) && sFrom>10)
				{
					tmp = tmp.toLocaleUpperCase().charCodeAt(0)-55;
				}
					
				dec+=parseFloat(tmp*(1/Math.pow(sFrom,i+1)));
				//alert(dec)
			}
			trunc = String(dec);
			var pr = String(trunc).indexOf(".");
			trunc = parseFloat(String(trunc).substr(pr+1));
			
		}
		trunc = parseFloat("0."+trunc);
		trunc = String(trunc).toFixed(fix);
		var pr = String(trunc).indexOf(".");
		trunc = parseFloat(String(trunc).substr(pr+1));
					
		
				
		
		
		if(sTo!=10)
		{
			
			var tmp = "0."+parseFloat(trunc);
			
			var tr = new String("");
			
			while(String(tr).length<fix && tmp!=0)
			{
				
				tmp = tmp*sTo;
				var one = parseInt(tmp);
				if(one>10 && sTo>10)
				{
					tr+= String.fromCharCode(tmp+55+hexUp)
				}
				else tr+=String(one);
				var pr = String(tmp).indexOf(".");
				if(pr!=-1)
				{
					tmp = parseFloat("0."+String(tmp).substr(pr+1));
					
				}
				else tmp=0;
			
				
				
				
				
				
			}
			trunc = tr;
		}
		
		dig = String(dig).substr(0,prPos);
		trunc = "."+trunc;
		//alert(trunc);
	}
	
	
	
	var tmp,i;
	if(sFrom!=10)
	{
		dig=String(dig);
		i=0;
		var len = dig.length;
		var dec = 0;
		while(dig[i])
		{
			tmp=dig[i];
			if(sFrom>10 && isNaN(tmp))
			{
				tmp=dig[i].toLocaleUpperCase();
				tmp=tmp.charCodeAt(0)-55;
				
				
			}
			dec+=parseInt(tmp)*Math.pow(sFrom,len-i-1);
			i++;
		}
		
		if(sTo==10) return new Array(String(dec+trunc),results);
		dig = dec;
	}
	
	
	dig  = parseInt(dig);
	var result = dig==0 ? new String("0") : new String("");
	
	var i=0;
	while(dig!=0)
	{
		results[0][i]=dig;
		tmp=dig % sTo;
		if(sTo>10 && tmp>=10)
		{
			tmp = String.fromCharCode(tmp+55+hexUp);
		}
		results[1][i++]=tmp;
		result=tmp+result;
		dig=Math.floor(dig/sTo);
		
	}
	return new Array(String(result+trunc),results);

	
	
	
}

function in_array(sym,arr)
{
   var i;
   in_arr = false;
   for(i=0;i<=arr.length;i++)
   {
      if(arr[i] == sym) 
      {
         in_arr = true;
         break;
      }
   }
   return in_arr;
}
function FromDec(dig,ToSys,UpHex,errMsg)
{
   
   var sum = '';
   if(errMsg == undefined) errMsg='��o �e ��c�o!';
   if((!isNaN(dig))&&(!isNaN(ToSys)))
   {
      PrefHex = 32 + 65 - 10;
      if(UpHex) PrefHex=65 - 10;
      if(ToSys<=9)
      {
         while(dig>0)
         {
            sum = String(dig % ToSys) + sum;
            dig = Math.floor(dig/ToSys);
         }
      }
      else if(ToSys==16)
      {
         var let;
         while(dig>0)
         {
            let = dig % 16;
            if(let>=9) let = String.fromCharCode(let+PrefHex);
            sum = String(let) + sum;
            dig = Math.floor(dig/16);
         }
      }
      else sum = "�peo�pa�o�a��e � �a�y� c�c�e�y �e �o��ep���ae�c�";
      
   }
   else sum = errMsg;
   return sum;
}                
                                                                   