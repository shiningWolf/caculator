const num = ["1","2","3","4","5","6","7","8","9","0","."];
const func = ["+","-","×","÷","="];
class Caculator{
	constructor(ele){
		this.lastNode = null;
		this.result = ele.querySelector('.num-result');
		this.numResult = 0;
		this.numState = 'input';
		this.funcType = '+';
		this.container = ele;
		this.bind();
	}

	bind(){
		this.container.addEventListener('click',(event)=>{
			if(event.target.className.includes('circle')){
				let value = event.target.innerText;
				this.lastNode && this.lastNode.classList.remove('active');
				if(num.includes(value)){
					if(this.numState == 'input')
						this.result.innerText = this.result.innerText-0 == "0" ? value : this.result.innerText + value;
					else{
						this.result.innerText = value;
						this.numState = "input";
					}
				}else if(func.includes(value)){  //加减乘除
					event.target.classList.add('active');
					if(this.numState == "clear"){ //只是修改运算符
						this.lastNode = event.target;
						this.funcType = value == "=" ? "+" : value;
						return;
					}  
					if(value != '='){
						this.numState = "clear";
					}else{
						this.numState = "cleardeng";
					}
					
					this.numResult = this.caul(this.numResult , (this.result.innerText - 0));
					this.funcType = value == "=" ? "+" : value;
					this.result.innerText = this.numResult;
					this.numResult = value == "=" ?  0 : this.numResult;
				}else{
					switch(value){
						case 'AC':
							this.reset();
							break;
						case '%':
							this.result.innerText = (this.result.innerText-0)/100;
							break;
						case '+/-':
							this.result.innerText = this.result.innerText.includes('-') ? this.result.innerText.slice(1) : '-'+this.result.innerText;
							break;
					}
				}
				this.lastNode = event.target;
				
			}
		})
	}

	caul(a,b){
		let val = 0;
		switch(this.funcType){
			case "+":
				val = a+b;
				break;
			case "-":
				val = a-b;
				break;
			case "×":
				val = a*b;
				break;
			case "÷":
				val = a/b;
				break;
			default:
				break;
		}
		return val;
	}

	reset(){
		this.numResult = 0;
		this.numState = 'input';
		this.funcType = '+';
		this.result.innerText = '0';
	}
}
export default Caculator