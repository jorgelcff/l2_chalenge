FROM openjdk:17
WORKDIR /app

# Copia o pom.xml e baixa as dependências antes de copiar o código-fonte
COPY pom.xml mvnw* ./
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copia o restante do código do projeto
COPY src ./src

# Compila o projeto e gera o JAR
RUN ./mvnw clean package -DskipTests

# Define o comando de execução
CMD ["java", "-jar", "target/*.jar"]
