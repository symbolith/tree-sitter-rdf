import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.rdf12nquads.TreeSitterRdf12Nquads;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterRdf12NquadsTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterRdf12Nquads.language()));
    }
}
