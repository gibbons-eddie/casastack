import { Header, Accordion, Label, Segment, Icon, Button, List } from 'semantic-ui-react';
import accountPageStyles from '../accountPage/accountPageStyles/accountPage.module.css';
import formatDate from '../../utils/formatDate';

function OrderHistory({orders}) {

    function displayOrder(orders) {
        return orders.map(order => ({
            key: order._id,
            title: {
                content: <>
                        <Label color='violet' content={formatDate(order.createdAt)}/>
                        <Label content={order.service}/>
                        </>
            },
            content: {
                content: (
                    <>
                        <List.Header as='h3'>
                            Price: ${order.price}
                            
                            <Label icon='map' basic horizontal content={order.location}
                            style={{
                                marginLeft: '1em'
                            }}
                            />
                        </List.Header>
                        <List.Content>
                            <List.Header><strong>Volunteer's email:</strong> {order.acceptor}</List.Header>
                            <List.Description><strong>Listing description:</strong> {order.description}</List.Description>
                        </List.Content>
                    </>
                )
            }
        }));
    }

    return (
    <div className={accountPageStyles.viewButton}>
        <Header as='h2' style={{ fontFamily: 'Montserrat' }}>
            <Icon name="book"/>
            Order History
        </Header>
        {orders.length === 0 ? ( // if there are no past orders
            <Segment inverted tertiary color='grey' textAlign='center'>
                <Header icon>
                    <Icon name='copy outline'/>
                    No past orders.
                </Header>
                
            </Segment>
        ) : (
            <Accordion fluid styled exclusive={false} panels={displayOrder(orders)}/>
        )}
    </div>
    );
}

export default OrderHistory;

/*
                <div>
                    <Button onClick={() => router.push('/')}>
                        
                    </Button>
                </div>
*/