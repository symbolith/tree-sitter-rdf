import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.rdf11turtle.TreeSitterRdf11Turtle;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterRdf11TurtleTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterRdf11Turtle.language()));
    }
}
