import expenseCss from "./expenses.module.css"
import { http } from "../../utils/request"
import { useEffect, useState } from "react";

function Expenses() {
    const [formData, setFormData] = useState({});
    const [visible, setVisible] = useState(false);
    const [response, setResponse] = useState(true);
    const handleInputChange = (e) => {
        // 获取输入的名称和值
        const { name, value, id, type } = e.target;
        // 更新表单数据的状态
        setFormData({
            ...formData,
            [name]: type === "radio" ? id : value,
        });
    }


    async function sendExpense() {
        try {
            await http.post("http://127.0.0.1:8000/uploaddata/", formData);
            // 请求成功时设置 visible 为 true
            setResponse(true);
            setVisible(true)
        } catch (error) {
            // 处理请求失败的情况
            setResponse(false)
            setVisible(true)
        }
    }
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 1000); // 1000ms 对应动画的持续时间
            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <>
            {visible && (
                <div className={`${expenseCss.response} ${expenseCss.hide}`}>
                    {response ? (
                        <>
                            <span style={{ color: 'green' }}> </span>
                            <span>上传成功</span>
                        </>
                    ) : (
                        <>
                            <span style={{ color: 'red' }}> </span>
                            <span>上传失败</span>
                        </>
                    )}

                </div>
            )}
            <form id={expenseCss.expenseForm}>
                <div>
                    <div className={expenseCss.textArea}>
                        <div> </div>
                        <input type="text" name="name" placeholder="请输入的名字" onChange={handleInputChange} />
                    </div>
                    <div className={expenseCss.textArea}>
                        <div> </div>
                        <input type="text" name="amount" placeholder="请输入的花费" onChange={handleInputChange} />
                    </div>
                    <div className={expenseCss.radioArea}>
                        <label>类型： </label>
                        <label htmlFor=""><input type="radio" name="category" id="Food" onChange={handleInputChange} />美食</label>
                        <label htmlFor=""><input type="radio" name="category" id="Personal Care" onChange={handleInputChange} />护理</label>
                        <label htmlFor=""><input type="radio" name="category" id="Transportation" onChange={handleInputChange} />交通</label>
                        <label htmlFor=""><input type="radio" name="category" id="Shopping" onChange={handleInputChange} />网购</label>
                        <label htmlFor=""><input type="radio" name="category" id="Entertainment" onChange={handleInputChange} />娱乐</label>
                        <label htmlFor=""><input type="radio" name="category" id="Others" onChange={handleInputChange} />其他</label>
                    </div>
                    <div className={expenseCss.radioArea}>
                        <label>地区： </label>
                        <label htmlFor=""><input type="radio" name="area" id="Brooklyn" onChange={handleInputChange} />布鲁克林</label>
                        <label htmlFor=""><input type="radio" name="area" id="Queens" onChange={handleInputChange} />皇后区</label>
                        <label htmlFor=""><input type="radio" name="area" id="Manhattan" onChange={handleInputChange} />曼哈顿</label>
                        <label htmlFor=""><input type="radio" name="area" id="Bronx" onChange={handleInputChange} />布朗克斯</label>
                        <label htmlFor=""><input type="radio" name="area" id="Staten Island" onChange={handleInputChange} />斯丹岛</label>
                    </div>
                    <textarea name="additional_info" id="" cols="30" rows="10" placeholder="请输入Note" onChange={handleInputChange}></textarea>
                    <div className={expenseCss.button} onClick={sendExpense}>提交</div>
                </div>
            </form >
        </>
    )
}

export default Expenses;