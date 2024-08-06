import { Button, Flex, Form, Input, message, Space, Steps, theme } from "antd"
import Title from "antd/es/typography/Title"
import { useState } from "react"
import { requestRecoverPassword, resetPassword, sendVerifyOTP } from "../../services/account_services"
import { useNavigate } from "react-router-dom"


export const RecoverPassword = () => {
   const { token } = theme.useToken()
   const [form] = Form.useForm()
   const [current, setCurrent] = useState(0)
   const [email, setEmail] = useState(null)
   const [otp, setOTP] = useState(null)
   const [newPass, setNewPass] = useState(null)
   const [newPassConfirm, setNewPassConfirm] = useState(null)

   const navigate = useNavigate()

   const onChange = (values) => {
      setOTP(values)
   };

   const handleEmailChange = (even) => {
      setEmail(even.target.value)
   }

   const handleNewPasswordChange = (even) => {
      setNewPass(even.target.value)
   }

   const handleNewPasswordConfirmChange = (even) => {
      setNewPassConfirm(even.target.value)
   }

   const steps = [
      {
         title: "Email",
         content: (
            <Form.Item
               name="email"
               rules={[{ required: true, message: "Please input your email!" }]}
            >
               <Input placeholder="Email" size="large" onChange={handleEmailChange} />
            </Form.Item>
         ),
      },
      {
         title: "Confirm OTP",
         content: (
            <Form.Item
               name="otp"
               form={form}
               rules={[{ required: true, message: "Please input OTP!" }]}
            >
               <Input.OTP
                  size="large"
                  formatter={(str) => str.toUpperCase()}
                  onChange={onChange}
               />
            </Form.Item>
         ),
      },
      {
         title: "Reset Password",
         content: (
            <>
               <Form.Item
                  name="newPass"
                  rules={[{ required: true, message: "Please input your new password!" }]}
               >
                  <Input.Password placeholder="Password" size="large" onChange={handleNewPasswordChange} />
               </Form.Item>
               <Form.Item
                  name="newPassConfirm"
                  rules={[{ required: true, message: "Please input password confirm!" }]}
               >
                  <Input.Password placeholder="Password Confirm" size="large" onChange={handleNewPasswordConfirmChange} />
               </Form.Item>
            </>
         )
      },
   ];

   const items = steps.map((item) => ({
      key: item.title,
      title: item.title,
   }));

   const goPrevStep = () => {
      setCurrent(current - 1)
   }

   const handleGoNextStep = async () => {
      let response
      switch (current) {
         case 0:
            response = await requestRecoverPassword({ email: email })
            break;
         case 1:
            response = await sendVerifyOTP({
               email: email,
               otp: otp
            })
            break
         case 2:
            if (newPass == newPassConfirm) {
               response = await resetPassword({
                  email: email,
                  newPass: newPass
               })
            }
            break
      }
      if (!response.success) {
         message.error(response.message)
      } else {
         if (current < steps.length - 1) {
            setCurrent(current + 1)
            setOTP(null)
            setNewPass(null)
            setNewPassConfirm(null)
         } else {
            message.success(response.message)
            navigate("/login")
         }
      }
   }


   return (
      <Flex
         align="center"
         justify="center"
         vertical
         style={{ height: "100vh" }}
      >
         <div
            className="p-6"
            style={{
               maxWidth: 800,
               width: "100%",
               border: "2px solid #ccc",
               padding: "24px",
               borderRadius: "5px",
               backgroundColor: "#fff",
            }}
         >
            <Space direction="vertical" style={{ width: "100%" }}>
               <Title level={2} style={{ textAlign: "center" }}>
                  Recover Password
               </Title>
               <Steps Steps current={current} items={items} />
               <Form>
                  <div
                     style={{
                        textAlign: "center",
                        color: token.colorTextTertiary,
                        backgroundColor: token.colorFillAlter,
                        marginTop: 16,
                        padding: 16,
                     }}
                  >
                     {steps[current].content}
                  </div>
               </Form>
               <div className="px-4">
                  {current < steps.length - 1 && (
                     <Button type="primary" onClick={handleGoNextStep}>
                        Next
                     </Button>
                  )}
                  {current == steps.length - 1 && (
                     <Button type="primary" onClick={handleGoNextStep}>
                        Done
                     </Button>
                  )}
                  {current > 0 && (
                     <Button
                        className="mx-2"
                        onClick={goPrevStep}
                     >
                        Previous
                     </Button>
                  )}
               </div>
            </Space>
         </div>
      </Flex>
   )
}