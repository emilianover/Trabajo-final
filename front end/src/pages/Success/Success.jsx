import { useNavigate } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
const Success = () => {
    const navigate = useNavigate()
    return(
        <div style={{backgroundColor: "white"}}>
  <Result
    icon={<SmileOutlined />}
    title="Your order is on the way"
    extra={<Button type="primary" onClick={() => navigate('/')}>Keep Buying</Button>}
  />
  </div>
)};
export default Success;