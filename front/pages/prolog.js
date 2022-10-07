import G1A_MetropolitanDay from './stats/G2A_MetropolitanDay';
import G1B_MetropolitanNight from './stats/G2B_MetropolitanNight';
import G1_YearbyGu from './stats/G1_YearbyGu';
import G3_EachGu from './stats/G3_EachGu';
import {useState} from 'react'


const Prolog = () => {
    const [isDay, setIsDay] = useState(1)
    const dayNightToggle = () => {setIsDay(prevStatus => !prevStatus)}
    return (
        <div>
            <h1>좀 조용한 동네 없을까?</h1>
            <br></br>
            <h3>1. 최근 소음 공해가 큰 문제가 되고 있습니다.</h3><br></br>
            <p>밖에서 들려 오는 경적 소리에 놀란 적 있으신가요?</p>     
            <p>천장을 울리는 누군가의 발소리로 잠을 못 이룬 적은 없으신가요?</p><br></br>
            <p>소음 공해는 미세먼지와 함께 환경을 위협하는 요인으로 지목되고 있습니다.</p>     
            <p>국내에서도 소음에 대해 불편을 호소하는 민원이 계속해서 증가하는 추세입니다.</p>     
            <p>2014년에는 4만 4천 건이었던 민원이 2020년 7만 1천 건까지 늘었죠.</p> <br></br>    
            <p>정부에서도 ‘4차 소음진동관리종합계획’을 마련하며 소음 문제에 대처하고 있지만, </p>     
            <p>여전히 실생활에 와닿는 정보는 미비한 것으로 파악했습니다.</p>     
            
            <div class='left'>
                
            </div>
            <div class='right'>
                <G1_YearbyGu _YearbyGu></G1_YearbyGu>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <h3>2. 특히 서울은 다른 지역보다 소음 수치가 높습니다</h3><br></br>


            <p>저희는 서울의 소음 문제에 집중하기로 했습니다.</p><br></br>

            <p>서울이 국내 타 지역에 비해 가장 높은 소음도를 보였기 때문입니다.</p>
            <p>특히 조용해야 할 주택가조차 환경 기준의 약 10dB이나 초과하는 수준이었죠.</p><br></br>


            
            <h4>지역별 평균 소음 비교&nbsp;<button onClick={dayNightToggle}>{isDay ? '낮' : '밤'}</button></h4>
            
            {isDay ? <G1A_MetropolitanDay></G1A_MetropolitanDay> : <G1B_MetropolitanNight></G1B_MetropolitanNight>}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <h3>3. 서울 내에도 어느정도 소음이 덜한 곳은 존재합니다</h3><br></br>
            <p>하지만 중요한 것은 서울 내에서도 지역구마다 편차가 존재한다는 점이었습니다.</p>
            <p>강남구와 노원구의 소음 민원 수는 무려 7배 이상의 차이가 있었습니다.</p><br></br>

            <p>따라서 소음 문제가 제일 심각하면서도, 지역구별 차이가 있는 서울을 타겟으로 하여</p>
            <p>각 지역구와 동의 소음 정보를 가시화할 수 있는 서비스를 제공하려고 합니다.</p>
            <G3_EachGu></G3_EachGu>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <h3>4. 그럼 저희 함께 어떤 동네가 조용한지 살펴보실까요?</h3>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}

export default Prolog;