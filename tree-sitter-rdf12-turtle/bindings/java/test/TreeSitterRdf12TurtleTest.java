import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.rdf12turtle.TreeSitterRdf12Turtle;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterRdf12TurtleTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterRdf12Turtle.language()));
    }
}
