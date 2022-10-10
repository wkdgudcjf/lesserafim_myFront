import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import media from '../utils/media';
import { EmpableSpan } from './ContentBase';

const PageTitleBlock = styled.div`
margin-bottom:70px;
${media.mobile`
margin-bottom:7.8vw;
`}

b {
  font-weight:bold;
  color: #111;
}
span {
  display: block;
}
#page-title {
  ${media.mobile`font-size:7.8vw;`}
  font-size: 50px;
  line-height: 1.38;
  color: #111;
}
#page-desc {
  ${media.mobile`font-size:4.68vw;
    white-space:normal;
    width:75vw;`}
  font-size: 24px;
  line-height: 1.5;
  letter-spacing: normal;
  color: #5b5b5b;
  white-space:nowrap;
}
`;

const MyPageTitle = ({ title, desc_m }) => {
  const {t} = useTranslation();
  return (
    <PageTitleBlock>
      <span lang="en" id="page-title">{title}</span>
      <EmpableSpan id="page-desc" text={[t("mypage1.1.0"), t("mypage1.1.1"), t("mypage1.1.2")]}></EmpableSpan>
    </PageTitleBlock>
  );
}; 

export default MyPageTitle;
