import React from 'react'
const LSidebar = () => {
    return(
        <div className='left-side-bar'>
            <div className='box-widget'>
                <div className="box-widget-header">Sim theo giá</div>
                <div className="box-widget-content">
                    <ul className="Ulist">
                        <li className=" "><a rel="dofollow" href="sim-gia-duoi-500-nghin">Sim dưới 500 nghìn</a></li>
                        <li className=" "><a rel="dofollow" href="sim-gia-tu-500-nghin-den-1-trieu">Sim giá 500 - 1 triệu</a></li>
                        <li className=" "><a rel="dofollow" href="sim-gia-tu-1-trieu-den-3-trieu">Sim giá 1 - 3 triệu</a></li>
                        <li className=" "><a rel="dofollow" href="sim-gia-tu-3-trieu-den-5-trieu">Sim giá 3 - 5 triệu</a></li>
                        <li className=" "><a rel="dofollow" href="sim-gia-tu-5-trieu-den-10-trieu">Sim giá 5 - 10 triệu</a></li>
                        <li className=" "><a rel="dofollow" href="sim-gia-tu-10-trieu-den-50-trieu">Sim giá 10 - 50 triệu</a></li>
                        <li className=" "><a rel="dofollow" href="sim-gia-tu-50-trieu-den-100-trieu">Sim giá 50 - 100 triệu</a></li>
                        <li className=" "><a rel="dofollow" href="sim-gia-tu-100-trieu-den-200-trieu">Sim giá 100 - 200 triệu</a></li>
                        <li className=" "><a rel="dofollow" href="sim-gia-tren-200-trieu">Sim giá trên 200 triệu</a></li>
                    </ul>
                </div>
            </div> 
        </div>
    )
}

export default LSidebar