import { Builder, By, until } from "selenium-webdriver";
import * as path from "path";
import "chromedriver";

(async function uploadClientFileTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:3000/client/upload"); // Ajuste a URL conforme necessário

    // Caminho para o arquivo CSV de teste
    const filePath = path.join(__dirname, "test_clients.csv");

    // Encontra o input do arquivo e envia o caminho do arquivo
    const fileInput = await driver.findElement(By.name("file"));
    await fileInput.sendKeys(filePath);

    // Clica no botão de submissão do formulário
    const submitButton = await driver.findElement(By.css("button[type='submit']"));
    await submitButton.click();

    // Aguarda pela mensagem de sucesso
    const successMessageElement = await driver.wait(
      until.elementLocated(By.css(".success-message")),
      5000
    );

    const successMessage = await successMessageElement.getText();
    console.log(successMessage);
  } finally {
    await driver.quit();
  }
})();
