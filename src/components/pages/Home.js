import { useEffect } from "react";
import Base from "../Base";
import NewFeed from "../NewFeed";
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "../CategorySideMenu";


const Home=()=>{

    return(
        <>
        <Base>
        <Container className="mt-3">
            <Row>
                <Col md={2} className="pt-5">                        
                    <CategorySideMenu/>
                </Col>
                <Col md={10}>
                    <NewFeed/>
                </Col>
            </Row>
        </Container>
       
       </Base>
        </>

    );
}

export default Home;