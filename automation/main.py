import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

class TestTutor(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.site_url = 'http://3.0.121.209:3000/'

        cls.driver.get(cls.site_url)

        username_field = cls.driver.find_element(By.ID, 'username')
        username_field.send_keys('johnDoe')

        password_field = cls.driver.find_element(By.ID, 'password')
        password_field.send_keys('passJD')

        login_button = cls.driver.find_elements(By.CLASS_NAME, "Login_grid-login-button__wSYMq")[0]
        login_button.click()

        time.sleep(5)

    @classmethod
    def tearDownClass(cls) -> None:
        cls.driver.quit()
    
    def test_login(self):
        header_text = self.driver.find_elements(By.CLASS_NAME, 'Header_header-current__-uL31')[0].text
        self.assertEqual(header_text, "Home")
    
    def test_add_resume(self):
        view_resume_link = self.driver.find_elements(By.CLASS_NAME, 'SideBar_sidebar-sub-menu-options__zg8dB')[3].find_element(By.TAG_NAME, 'a')
        view_resume_url = view_resume_link.get_attribute('href')
        self.driver.get(view_resume_url)

        time.sleep(5)
        add_service_button = self.driver.find_elements(By.CLASS_NAME, 'geninfo_addsvc-button__CqAt0')[0].find_element(By.TAG_NAME, 'button')
        add_service_button.click()

        time.sleep(2)

        input_form_subject = self.driver.find_element(By.ID, 'subject')
        input_form_subject.send_keys('MATHS TEST')

        input_form_topic = self.driver.find_element(By.ID, 'topic')
        input_form_topic.send_keys('ALGEBRA TEST')

        input_form_experience = self.driver.find_element(By.ID, 'experience')
        input_form_experience.send_keys('1')

        input_form_rate = self.driver.find_element(By.ID, 'rate')
        input_form_rate.send_keys('1')

        time.sleep(5)

        submit_button = self.driver.find_element(By.CLASS_NAME, 'ant-btn-primary')
        submit_button.click()

        time.sleep(3)

        resume_list = self.driver.find_elements(By.CLASS_NAME, 'card_card__jqMJV')
        latest_resume_in_list = resume_list[-1]
        resume_test_title = latest_resume_in_list.find_element(By.TAG_NAME, 'h2').text
        self.assertEqual(resume_test_title, "MATHS TEST")

if __name__ == "__main__":
    unittest.main()

