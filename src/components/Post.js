import { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

export default function Post(){
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function deletePost() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
        
    function closeModal() {
        setIsOpen(false);
    }
        
     return(
        <PostCard>
            <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX6QJj////6NpT6LpL+0eP6Rpv8lsH+5/D6O5b6KJD+3On/8vf7Z6r7eLL6M5P6OZX8oMf/+vz8jLz9w9v6VqH8kr/8qMv/+Pv+4Oz+2Oj9zOD9u9b7hbj7ZKj6T57/8Pb7ca79sND7f7X9v9j8qsz7dK/6VKFGJnvUAAAFOklEQVR4nO2c6XLiOhBGLQuDRUBmCQlbWJLJvP8jDqTIjLtluFxLSbdT3/krm+KUZKm7JTvLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABN2DZ4n1el9D+/k2LV+7+s1/PNcbIdVc76DngWpj3T4Wa2c7aSdrhNjOEHD/OtVy0ZbXimN7Ne7XBNYnhi8+iUOqYyNGY10umYztCY4YuT1mkgpaEx68JLCwWkNTRmom6opjY0g52ybkxuaMxM19P4BYZmrkrxKwzNQFO4+iWG5qHQE8cxw/mi/99Mnjbr4cNNxelOjSIzXLj8Dry31uWHyXp63XGnZaAyw35+/61lbt3oeK0vp5kSxQjDM6V3h3Wz4l7JuhhpeKJ0xVuj4lDHohFveHK0RWM/HlUopjA89+PhuUHxvd2vpSWNYZZVbt6gqGHJSGWYZW4WGq4VjNN0hpl/CRXH8r2Y0DCrdsHD+CDfiSkNs7IIFCfiq2JSw6zcBeNUtaF1V7A2vxKS5SNu+Eta8YahHT40sh+s5k9j7xq72064ov0ulSvcMHSDYMjVWU6KpqqTW7HrIgd+NO0NT/Qai8DsooHwdBplaMzqdzAIPR+nL7JpVKThaSYJusjt6RUb2bkm2tAsS9ZH1ZZeMJUdpvGG5pnXZBzL+0eiwzSBYVCTyfu0+Sg6TJMYPrMFwdPmpegwTWLICxaWpfzd70MeYPO55l3yQUxkaOivsmE6kQxrUhm+kZXfLUnjXDI2vdtw8T6+sJ3MG8rARf1X/ZG0iQZudxu+5OWF6lzr7nFDkiWxB1F0zb/bkC7bpTuwPYt93aJ8pI2deA55YFKVLPx8rF9gb7R9M60NszK7fmvmaMHm0EnDLH8lt5IJk83Dr4JFxQhDdsGybmjpcrHtqKF/ql9ASqOW1jJmHTWsxuTeH2hY0jI+MRz+DMPDVUP3M55DmumS55Cl+ZLJRYwhTQOHZLWgPytZbouaacitb7XAlO9fFMG930eEoT1evbWiwYDpYOSdnbfS6K31cpT/RZq6kT0Fhmy6JLmFo4vFuhMZMDd0R3rnUz0/tDfavpu2hpafS6hPJrwSNe5EJYoaejaV0IHIq4mi+2vtDD2NSA3LcUva1pGKcN0wFCTJId9f60hVv2boaTx6hgxhluALbyC2qLX54DSCWdSftHxBG4XP1LSplwaCPeLAu1B2kCapedOtp2CXW/g8dApDVitkratun1Q480pGoePVcMk625l4wz4JOnMeCuylz+5FG06oQcnbZ9LnhGMNmSBLKhR0YawhE7RP/ALppzDWkAnm7/wC2ZD0gyhD/gyGp0slN50uxBgywcwHW8Mb6aOXWZQhF2RljRPPCgQjDAPB8L2Zd/FpJrtp6OfD6ywDwU0guJGfZrLb57z9rU/UsIXcBeuEgqXwg0Rn9V0/ENQwj55JYxhU3k7MpA/pX0hiGFTeTrzpGKNpDBvqNhqCmQsJDPOGN7r4iVNB4g2rx1BQunJRJ9qwLBpeWR/p6cJowzJreD12q2Qa/SD6bfV9KNjXEI7+JdLQNsSuPJ4TJs4wKFoYLe+o/6PVdzE+CSqHRku4XaPNt00+WTR8Z0DX13fOJP4+TU+dYGJD6Qp+E0kN9QSjNVIaDlStg58kNNxfe8FblnSGz1o+KsRIZjgtdAqmM/ytoXLYRCrDF0X5EiWRoaaEkJHGcKwpIWQkMdyqXAgvpDBcaBZs8012jq6UPqTVd/Vv7WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK7wB8OOThD0TGT9AAAAAElFTkSuQmCC"} />
            <PostContent>
                <Header>
                  <h2>Driven</h2>
                  <IonIcon>
                    <ion-icon onClick={editPost} name="pencil-outline"></ion-icon>
                    <ion-icon onClick={deletePost} name="trash-outline"></ion-icon>
                    <ReactModal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                     >
                     <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Are you sure you want to delete this post?</h2>
                     <button onClick={closeModal}>No,go back</button>
                     <button>Yes,delete it</button>
                   </ReactModal>
                  </IonIcon>
                </Header>
               <h3>Uhul que link maneiro ula ula</h3>
            </PostContent>
        </PostCard>
    )
}

function editPost() {
    alert("Editar funcionando")
}

const PostCard = styled.div`
    width: 611px;
    background-color: #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius:16px;
    padding: 16px;
    display: flex;
    img{
        width:50px;
        height: 50px;
        border-radius: 50%;
    }
`
const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 19px;
    margin-bottom:16px;
    h2{
        color: #ffffff;
        font-size:19px;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        margin-bottom: 13px;
    }

    ion-icon{
        font-size: 19px;
        color: #ffffff;
        margin-left: 8px
    }

    h3{
        color: #b7b7b7;
        font-size:17px;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        margin-bottom: 13px;
    }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between
`
const IonIcon = styled.div`
  display: flex;
  margin-left: 20px
`