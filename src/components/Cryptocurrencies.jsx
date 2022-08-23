import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Typography } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
const { Title } = Typography;
const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;

    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    console.log(cryptos);

    useEffect(() => {
        //setCryptos(cryptosList?.data?.coins);

        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return <Loader />

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input
                        placeholder="Search Cryptocurrency"
                        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        className="crypto-card"
                        key={currency.uuid}
                    >

                        {/* Note: Change currency.id to currency.uuid  */}
                        <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                            <Card
                                title={<Title level={5} style={{ color: "rgb(80 91 231 / 85%)" }}>{currency.rank}. {currency.name}</Title>}
                                extra={<img className="crypto-image" src={currency.iconUrl} />}
                                hoverable style={{ background: "#000000eb", backgroundImage: "url('https://www.transparenttextures.com/patterns/brilliant.png')"}}
                            >
                                <p style={{ color: "rgb(183 179 183)",fontWeight:"500" }}>Price: ${millify(currency.price)}</p>
                                <p style={{ color: "rgb(183 179 183)", fontWeight: "500" }}>Market Cap: ${millify(currency.marketCap)}</p>
                                {/* { <p style={{ color: "rgb(183 179 183)" }}>Daily Change: {currency.change}%</p>} */}
                                {currency.change < 0 ? (
                                    <p style={{ color: "rgb(183 179 183)", fontWeight: "500" }}>Daily Change: <span style={{ color: "red" }}>{currency.change}%</span></p>
                                ) : (
                                        <p style={{ color: "rgb(183 179 183)", fontWeight: "700" }}>Daily Change: <span style={{ color: "green" }}>{currency.change}%</span></p>
                                )}
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies;