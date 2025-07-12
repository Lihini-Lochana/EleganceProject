package com.elegancetour.predesignedpackages.seleniumtests;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;

import java.time.Duration;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class BookingFlowUITest {

    private static WebDriver driver;
    private static WebDriverWait wait;

    @BeforeAll
    public static void setUp() {
        System.setProperty("webdriver.chrome.driver", "C:\\selenium\\chromedriver.exe");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.manage().window().maximize();
    }

    private void slowDown(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }


    @Test
    @Order(1)
    public void testFullBookingFlow() throws InterruptedException {
        driver.get("http://localhost:3000/tourist-view-season");
        slowDown(1500);

        WebElement seasonButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[contains(text(),'South Season') or contains(text(),'Arugam Bay Season')]")));
        seasonButton.click();
        slowDown(1500);

        WebElement seeMoreBtn = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[text()='See More']")));
        seeMoreBtn.click();
        slowDown(1500);

        WebElement passengerInput = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("passengerCount")));
        passengerInput.clear();
        passengerInput.sendKeys("2");

        Thread.sleep(1500);

        WebElement nextBtn1 = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[text()='Next' or .='Next']")));
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", nextBtn1);
        Thread.sleep(500);

        wait.until(ExpectedConditions.elementToBeClickable(nextBtn1)).click();
        slowDown(1500);


        WebElement plusButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='+' and not(@disabled)]")));

        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", plusButton);

        Thread.sleep(300);

        plusButton.click();

        WebElement nextBtn2 = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='Next' or .='Next']")));

        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", nextBtn2);
        Thread.sleep(300);
        nextBtn2.click();
        slowDown(1500);


        try {
            WebElement eventCard = wait.until(ExpectedConditions.elementToBeClickable(
                    By.xpath("//div[contains(@style,'cursor: pointer')]")));
            eventCard.click();
            slowDown(1500);
        } catch (TimeoutException e) {
            System.out.println("No event selected (optional).");
        }

        WebElement nextBtn3 = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//button[text()='Next' or .='Next']")));
        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", nextBtn3);
        Thread.sleep(300);
        nextBtn3.click();
        slowDown(1500);

        WebElement passengerField = wait.until(ExpectedConditions.presenceOfElementLocated(
                By.cssSelector("input[type='number']")));
        passengerField.clear();
        passengerField.sendKeys("2");

        WebElement dateField = driver.findElement(By.cssSelector("input[type='date']"));
        dateField.sendKeys("01-07-2025");

        WebElement timeField = wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("input[type='time']")));
        ((JavascriptExecutor) driver).executeScript("arguments[0].value = arguments[1];", timeField, "10:30");



        WebElement confirmBtn = driver.findElement(By.xpath("//button[text()='Confirm Booking']"));
        confirmBtn.click();
        slowDown(1500);

        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());
            System.out.println("Success: " + alert.getText());
            alert.accept();
        } catch (TimeoutException e) {
            System.out.println("No alert appeared.");
        }

        wait.until(ExpectedConditions.urlContains("/tourist-bookings/1"));
        Assertions.assertTrue(driver.getCurrentUrl().contains("/tourist-bookings/1"), "Booking not completed.");
    }


    @AfterAll
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
